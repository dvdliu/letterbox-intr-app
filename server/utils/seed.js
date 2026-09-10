import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PostMessage from '../models/postMessage.js';

dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

const DAVID_ID = new mongoose.Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa');

const posts = [
  {
    creator: DAVID_ID,
    name: 'David Liu',
    title: 'Past Lives',
    message: 'Celine Song\'s debut is quietly devastating. Two people, two timelines, one unanswerable question about the lives we don\'t live. The final scene might be the best-acted moment of the decade.',
    tags: ['pastlives', 'romance', 'drama', 'a24'],
    selectedFile: 'https://media.themoviedb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    likes: [],
    createdAt: new Date('2024-08-12T18:00:00Z'),
  },
  {
    creator: DAVID_ID,
    name: 'David Liu',
    title: 'Dune: Part Two',
    message: 'Villeneuve absolutely delivered. The sandworm riding sequence had the entire theater holding their breath. Zendaya finally gets something real to do and she does not disappoint.',
    tags: ['dune', 'scifi', 'epic', 'villeneuve'],
    selectedFile: 'https://media.themoviedb.org/t/p/w500/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg',
    likes: [],
    createdAt: new Date('2024-03-10T21:00:00Z'),
  },
  {
    creator: DAVID_ID,
    name: 'David Liu',
    title: 'Interstellar (rewatch)',
    message: 'Rewatched on IMAX — still one of the greatest theater experiences ever made. Hans Zimmer\'s organ score hits different when it\'s rattling the seat. The Cooper-Murph relationship wrecks me every time.',
    tags: ['interstellar', 'nolan', 'scifi', 'rewatch'],
    selectedFile: 'https://media.themoviedb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    likes: [],
    createdAt: new Date('2024-01-20T20:00:00Z'),
  },
  {
    creator: DAVID_ID,
    name: 'David Liu',
    title: 'Challengers',
    message: 'Guadagnino turned a love triangle into a full-on sports thriller. The editing is insane, the score is even more insane, and Zendaya is doing some of her best work. 4.5/5.',
    tags: ['challengers', 'tennis', 'drama', 'guadagnino'],
    selectedFile: 'https://media.themoviedb.org/t/p/w500/H6vke7zGiuLsz4v4RPeReb9rsv.jpg',
    likes: [],
    createdAt: new Date('2024-04-28T19:30:00Z'),
  },
  {
    creator: DAVID_ID,
    name: 'David Liu',
    title: 'The Social Network',
    message: 'Fincher + Sorkin + Reznor/Ross is still the most stacked creative team ever assembled for a single film. A movie about Facebook that has aged into a tragedy. Every rewatch reveals something new.',
    tags: ['thesocialnetwork', 'fincher', 'sorkin', 'classic'],
    selectedFile: 'https://media.themoviedb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg',
    likes: [],
    createdAt: new Date('2023-11-05T17:00:00Z'),
  },
];

async function seed() {
  const url = process.env.con_url.replace('mongodb.net/?', 'mongodb.net/filmterest?');
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  await PostMessage.deleteMany({ name: 'David Liu' });
  const inserted = await PostMessage.insertMany(posts);
  console.log(`Inserted ${inserted.length} posts for David Liu`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((err) => { console.error(err); process.exit(1); });
