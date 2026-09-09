// Deterministic placeholder Letterboxd data, used until real API access is
// approved (see LETTERBOXD_API_KEY in controllers/letterboxd.js). Every value
// here is derived from the username so the same user always gets the same
// mock diary and the same match score, instead of random noise on every call.

const FILM_POOL = [
  { id: 'f1', title: 'Parasite', year: 2019 },
  { id: 'f2', title: 'Everything Everywhere All at Once', year: 2022 },
  { id: 'f3', title: 'The Grand Budapest Hotel', year: 2014 },
  { id: 'f4', title: 'Spirited Away', year: 2001 },
  { id: 'f5', title: 'Whiplash', year: 2014 },
  { id: 'f6', title: 'Mad Max: Fury Road', year: 2015 },
  { id: 'f7', title: 'Her', year: 2013 },
  { id: 'f8', title: 'La La Land', year: 2016 },
  { id: 'f9', title: 'Get Out', year: 2017 },
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
