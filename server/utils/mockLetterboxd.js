// Deterministic placeholder Letterboxd data, used until real API access is
// approved (see LETTERBOXD_API_KEY in controllers/letterboxd.js). Every value
// here is derived from the username so the same user always gets the same
// mock diary and the same match score, instead of random noise on every call.

const FILM_POOL = [
  { id: 'f1',  title: 'Parasite', year: 2019 },
  { id: 'f2',  title: 'Everything Everywhere All at Once', year: 2022 },
  { id: 'f3',  title: 'The Grand Budapest Hotel', year: 2014 },
  { id: 'f4',  title: 'Spirited Away', year: 2001 },
  { id: 'f5',  title: 'Whiplash', year: 2014 },
  { id: 'f6',  title: 'Mad Max: Fury Road', year: 2015 },
  { id: 'f7',  title: 'Her', year: 2013 },
  { id: 'f8',  title: 'La La Land', year: 2016 },
  { id: 'f9',  title: 'Get Out', year: 2017 },
  { id: 'f10', title: 'Portrait of a Lady on Fire', year: 2019 },
  { id: 'f11', title: 'Blade Runner 2049', year: 2017 },
  { id: 'f12', title: 'Moonlight', year: 2016 },
  { id: 'f13', title: 'Inside Out', year: 2015 },
  { id: 'f14', title: 'The Social Network', year: 2010 },
  { id: 'f15', title: 'Knives Out', year: 2019 },
  { id: 'f16', title: 'Dune', year: 2021 },
  { id: 'f17', title: 'The Lighthouse', year: 2019 },
  { id: 'f18', title: 'Call Me by Your Name', year: 2017 },
  { id: 'f19', title: 'Arrival', year: 2016 },
  { id: 'f20', title: 'Little Women', year: 2019 },
  { id: 'f21', title: 'Interstellar', year: 2014 },
  { id: 'f22', title: 'The Shape of Water', year: 2017 },
  { id: 'f23', title: 'Lady Bird', year: 2017 },
  { id: 'f24', title: 'Nomadland', year: 2020 },
  { id: 'f25', title: 'Past Lives', year: 2023 },
  { id: 'f26', title: 'Oppenheimer', year: 2023 },
  { id: 'f27', title: 'Poor Things', year: 2023 },
  { id: 'f28', title: 'The Zone of Interest', year: 2023 },
  { id: 'f29', title: 'Aftersun', year: 2022 },
  { id: 'f30', title: 'Tár', year: 2022 },
  { id: 'f31', title: 'The Banshees of Inisherin', year: 2022 },
  { id: 'f32', title: 'The Fabelmans', year: 2022 },
  { id: 'f33', title: 'Dune: Part Two', year: 2024 },
  { id: 'f34', title: 'Challengers', year: 2024 },
  { id: 'f35', title: 'A Real Pain', year: 2024 },
  { id: 'f36', title: 'Anora', year: 2024 },
  { id: 'f37', title: 'The Substance', year: 2024 },
  { id: 'f38', title: 'Conclave', year: 2024 },
  { id: 'f39', title: 'I Saw the TV Glow', year: 2024 },
  { id: 'f40', title: 'Longlegs', year: 2024 },
];

export const MOCK_FRIEND_REVIEWS = [
  {
    id: 'mock-fr-1',
    author: 'cinephile_maya',
    avatar: '',
    film: 'Anora',
    year: 2024,
    rating: 5,
    review: 'Sean Baker at his absolute best. Yura Borisov is a revelation — the final act completely wrecked me. This is the kind of film that makes you remember why you love movies.',
    createdAt: '2024-11-03T14:22:00Z',
    link: '',
  },
  {
    id: 'mock-fr-2',
    author: 'reeltalks_jay',
    avatar: '',
    film: 'The Substance',
    year: 2024,
    rating: 4,
    review: 'Coralie Fargeat goes fully unhinged and I am HERE for it. Body horror as feminist manifesto. Not for the faint-hearted but the audacity alone earns four stars.',
    createdAt: '2024-10-28T09:11:00Z',
    link: '',
  },
  {
    id: 'mock-fr-3',
    author: 'annalise.watches',
    avatar: '',
    film: 'Challengers',
    year: 2024,
    rating: 4.5,
    review: 'Luca Guadagnino turned a love triangle into a sports thriller into a meditation on desire. Trent Reznor and Atticus Ross\'s score is the best of the year, easily.',
    createdAt: '2024-04-26T18:45:00Z',
    link: '',
  },
  {
    id: 'mock-fr-4',
    author: 'marcus_at_the_movies',
    avatar: '',
    film: 'Dune: Part Two',
    year: 2024,
    rating: 4.5,
    review: 'Villeneuve delivered. The Harkonnen sequences in black-and-white IMAX are some of the most striking images I\'ve seen in a cinema in years. Zendaya finally gets to act.',
    createdAt: '2024-03-02T20:00:00Z',
    link: '',
  },
  {
    id: 'mock-fr-5',
    author: 'cinephile_maya',
    avatar: '',
    film: 'Past Lives',
    year: 2023,
    rating: 5,
    review: 'Quiet, aching, and devastating. Celine Song\'s debut is one of the best romantic films of this decade. I cried four times and I\'d do it again immediately.',
    createdAt: '2023-06-18T11:30:00Z',
    link: '',
  },
  {
    id: 'mock-fr-6',
    author: 'reeltalks_jay',
    avatar: '',
    film: 'Poor Things',
    year: 2023,
    rating: 4,
    review: 'A maximalist, grotesque, delirious fever dream. Emma Stone is genuinely fearless here. Lanthimos has crafted something that rewards patience even when it frustrates.',
    createdAt: '2023-12-10T16:00:00Z',
    link: '',
  },
  {
    id: 'mock-fr-7',
    author: 'nora_letterboxd',
    avatar: '',
    film: 'Aftersun',
    year: 2022,
    rating: 5,
    review: 'I don\'t know how Charlotte Wells made something this emotionally precise for a debut. The final sequence is one of the most shattering things I\'ve ever witnessed on film.',
    createdAt: '2022-12-01T21:00:00Z',
    link: '',
  },
  {
    id: 'mock-fr-8',
    author: 'marcus_at_the_movies',
    avatar: '',
    film: 'Tár',
    year: 2022,
    rating: 3.5,
    review: 'Cate Blanchett is mesmerizing — no question, best performance of 2022. The film itself is a little too self-satisfied for me, but you absolutely need to see it for her.',
    createdAt: '2022-10-14T13:00:00Z',
    link: '',
  },
  {
    id: 'mock-fr-9',
    author: 'annalise.watches',
    avatar: '',
    film: 'The Banshees of Inisherin',
    year: 2022,
    rating: 4.5,
    review: 'Martin McDonagh writing a friendship breakup as a meditation on grief and stubbornness. Colin Farrell and Brendan Gleeson are heartbreaking. A total gut-punch.',
    createdAt: '2022-11-05T19:20:00Z',
    link: '',
  },
  {
    id: 'mock-fr-10',
    author: 'nora_letterboxd',
    avatar: '',
    film: 'I Saw the TV Glow',
    year: 2024,
    rating: 4.5,
    review: 'Jane Schoenbrun has made a film that functions almost entirely as feeling. Surreal, deeply queer, genuinely unsettling. It burrows into you and refuses to leave.',
    createdAt: '2024-05-20T10:00:00Z',
    link: '',
  },
];

export const DEMO_MATCH_CANDIDATES = [
  { name: 'Maya Chen',     letterboxdUsername: 'cinephile_maya' },
  { name: 'Jay Okafor',    letterboxdUsername: 'reeltalks_jay' },
  { name: 'Annalise Park', letterboxdUsername: 'annalise.watches' },
  { name: 'Marcus Webb',   letterboxdUsername: 'marcus_at_the_movies' },
  { name: 'Nora Dubois',   letterboxdUsername: 'nora_letterboxd' },
];

// FNV-1a string hash -> 32-bit seed.
function seedFromString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

// mulberry32 PRNG - small, seedable, good enough for mock data generation.
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Builds a stable, fake "diary" of watched films + ratings for a username.
export function mockDiaryForUser(username) {
  const key = (username || 'guest').toLowerCase().trim();
  const rng = mulberry32(seedFromString(key));

  const shuffled = [...FILM_POOL].sort(() => rng() - 0.5);
  const watchCount = 10 + Math.floor(rng() * 8); // 10-17 films

  return shuffled.slice(0, watchCount).map((film) => ({
    ...film,
    rating: Math.round((0.5 + rng() * 4.5) * 2) / 2, // 0.5-5.0 in half-star steps
  }));
}

// Compares two diaries (arrays of { id, title, year, rating }) and returns a
// 0-100 compatibility score plus the detail of films both people logged.
export function computeCompatibility(diaryA, diaryB) {
  const mapA = new Map(diaryA.map((f) => [f.id, f]));
  const mapB = new Map(diaryB.map((f) => [f.id, f]));

  const sharedIds = [...mapA.keys()].filter((id) => mapB.has(id));
  const unionSize = new Set([...mapA.keys(), ...mapB.keys()]).size || 1;

  const sharedFilms = sharedIds
    .map((id) => {
      const a = mapA.get(id);
      const b = mapB.get(id);
      return {
        id,
        title: a.title,
        year: a.year,
        ratingA: a.rating,
        ratingB: b.rating,
        diff: Math.abs(a.rating - b.rating),
      };
    })
    .sort((a, b) => a.diff - b.diff);

  const overlapScore = sharedIds.length / unionSize;
  const ratingScore = sharedFilms.length
    ? 1 - sharedFilms.reduce((sum, f) => sum + f.diff, 0) / sharedFilms.length / 4.5
    : 0.5; // neutral when there's nothing shared to compare ratings on

  const score = Math.round((0.5 * overlapScore + 0.5 * Math.max(0, ratingScore)) * 100);

  return { score, sharedFilms };
}
