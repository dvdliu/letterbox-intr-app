import axios from 'axios';

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
        message: 'Letterboxd API key not configured. Awaiting API access approval.',
        reviews: [
          {
            id: 'placeholder-1',
            author: 'jane_doe',
            avatar: '',
            film: 'Sample Film',
            year: 2024,
            rating: 4.5,
            review: 'Placeholder review while waiting for Letterboxd API access.',
            createdAt: new Date().toISOString(),
            link: '',
          },
        ],
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
