import axios from 'axios';

import User from '../models/user.js';
import { mockDiaryForUser, computeCompatibility, MOCK_FRIEND_REVIEWS, DEMO_MATCH_CANDIDATES } from '../utils/mockLetterboxd.js';

const LETTERBOXD_API_BASE = process.env.LETTERBOXD_API_BASE || 'https://api.letterboxd.com/api/v0';
const LETTERBOXD_API_KEY = process.env.LETTERBOXD_API_KEY || '';
const LETTERBOXD_API_SECRET = process.env.LETTERBOXD_API_SECRET || '';

const letterboxdClient = axios.create({
  baseURL: LETTERBOXD_API_BASE,
  headers: {
    Authorization: `Bearer ${LETTERBOXD_API_KEY}`,
    'X-Letterboxd-Secret': LETTERBOXD_API_SECRET,
  },
});

export const getFriendReviews = async (req, res) => {
  try {
    const { username } = req.query;

    if (!LETTERBOXD_API_KEY) {
      return res.status(200).json({
        pending: true,
        message: 'Letterboxd API key not configured. Showing demo data.',
        reviews: MOCK_FRIEND_REVIEWS,
      });
    }

    const following = await letterboxdClient.get(`/member/${username}/following`);
    const friends = following.data?.items || [];

    const reviewsByFriend = await Promise.all(
      friends.map(async (friend) => {
        const { data } = await letterboxdClient.get(`/log-entries`, {
          params: { member: friend.id, perPage: 10, sort: 'WhenAdded' },
        });
        return (data?.items || []).map((entry) => ({
          id: entry.id,
          author: friend.username,
          avatar: friend.avatar?.sizes?.[0]?.url || '',
          film: entry.film?.name,
          year: entry.film?.releaseYear,
          rating: entry.rating,
          review: entry.review?.text || '',
          createdAt: entry.whenCreated,
          link: entry.links?.find((l) => l.type === 'letterboxd')?.url || '',
        }));
      })
    );

    res.status(200).json({ pending: false, reviews: reviewsByFriend.flat() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetches a Letterboxd diary for matching purposes. Falls back to the
// deterministic mock diary whenever there's no API key yet, or if the live
// lookup fails (e.g. an unrecognized username) so matching never hard-errors.
const getDiaryFor = async (username) => {
  if (!LETTERBOXD_API_KEY) return mockDiaryForUser(username);

  try {
    const { data } = await letterboxdClient.get('/log-entries', {
      params: { member: username, perPage: 50, sort: 'WhenAdded' },
    });
    const diary = (data?.items || []).map((entry) => ({
      id: entry.film?.id || entry.id,
      title: entry.film?.name,
      year: entry.film?.releaseYear,
      rating: entry.rating,
    }));
    return diary.length ? diary : mockDiaryForUser(username);
  } catch (error) {
    return mockDiaryForUser(username);
  }
};

export const getMatch = async (req, res) => {
  try {
    const { userA, userB } = req.query;

    if (!userA || !userB) {
      return res.status(400).json({ message: 'userA and userB query params are required.' });
    }

    const [diaryA, diaryB] = await Promise.all([getDiaryFor(userA), getDiaryFor(userB)]);
    const { score, sharedFilms } = computeCompatibility(diaryA, diaryB);

    res.status(200).json({
      pending: !LETTERBOXD_API_KEY,
      userA,
      userB,
      score,
      sharedFilms,
      totalWatchedA: diaryA.length,
      totalWatchedB: diaryB.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMatches = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) return res.status(400).json({ message: 'username query param is required.' });

    const dbUsers = await User.find({
      letterboxdUsername: { $exists: true, $nin: ['', username] },
    });

    const candidateList = LETTERBOXD_API_KEY
      ? dbUsers
      : [
          ...dbUsers,
          ...DEMO_MATCH_CANDIDATES.filter(
            (d) => !dbUsers.some((u) => u.letterboxdUsername === d.letterboxdUsername)
          ),
        ];

    const myDiary = await getDiaryFor(username);

    const matches = await Promise.all(
      candidateList.map(async (candidate) => {
        const otherDiary = await getDiaryFor(candidate.letterboxdUsername);
        const { score, sharedFilms } = computeCompatibility(myDiary, otherDiary);

        return {
          name: candidate.name,
          letterboxdUsername: candidate.letterboxdUsername,
          score,
          sharedFilmCount: sharedFilms.length,
          topSharedFilms: sharedFilms.slice(0, 3),
        };
      })
    );

    matches.sort((a, b) => b.score - a.score);

    res.status(200).json({ pending: !LETTERBOXD_API_KEY, username, matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!LETTERBOXD_API_KEY) {
      return res.status(200).json({ pending: true, review: null });
    }

    const { data } = await letterboxdClient.get(`/log-entry/${id}`);
    res.status(200).json({ pending: false, review: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
