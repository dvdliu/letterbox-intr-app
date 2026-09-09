# Filmterest

A social media app for sharing posts, viewing friends' Letterboxd reviews, and matching with people who share your film taste. Users can sign up, sign in (including with Google), create and like posts, see a feed of reviews their friends have left on Letterboxd, and check a compatibility score against any Letterboxd username or other Filmterest members.

## Tech Stack

- **Client**: React, Redux, Material UI, Axios
- **Server**: Node.js, Express, MongoDB (Mongoose), JWT
- **External APIs**: Letterboxd API (pending access)

## Project Structure

```
letterbox-app/
├── client/    React frontend
└── server/    Express backend
```

## Prerequisites

- Node.js 16+ and npm
- A MongoDB connection string
- (Optional) Letterboxd API key and secret — the app falls back to placeholder data while waiting on API access

## Environment Variables

### Server

Copy `server/.env.example` to `server/.env` and fill it in:

```
con_url=<your MongoDB connection string>
PORT=7000
secret_key=<a long random string used to sign JWTs>

LETTERBOXD_API_BASE=https://api.letterboxd.com/api/v0
LETTERBOXD_API_KEY=<your Letterboxd API key>
LETTERBOXD_API_SECRET=<your Letterboxd API secret>
```

`con_url` and `secret_key` are required for the server to start and for sign in/sign up to work. If `LETTERBOXD_API_KEY` is not set, the `/letterboxd/friend-reviews`, `/letterboxd/match`, and `/letterboxd/matches` endpoints fall back to deterministic placeholder data (flagged with `pending: true`) so the UI still renders.

### Client

Copy `client/.env.example` to `client/.env`:

```
REACT_APP_API_URL=http://localhost:7000
REACT_APP_GOOGLE_CLIENT_ID=
```

`REACT_APP_API_URL` points the client at the server above. `REACT_APP_GOOGLE_CLIENT_ID` is optional — leave it blank to hide the "Sign In with Google" button and use email/password sign in instead.

## Getting Started

### 1. Install dependencies

In two separate terminals:

```bash
cd server
npm install
```

```bash
cd client
npm install
```

### 2. Start the server

```bash
cd server
npm start
```

The server runs on `http://localhost:7000` by default.

### 3. Start the client

```bash
cd client
npm start
```

The client runs on `http://localhost:3000`.

## Available Scripts

### Server (`server/`)

- `npm start` — start the Express server

### Client (`client/`)

- `npm start` — run the React dev server
- `npm run build` — produce a production build
- `npm test` — run tests

## API Endpoints

### Posts
- `GET /posts` — list posts
- `POST /posts` — create a post (auth required)
- `PATCH /posts/:id` — update a post (auth required)
- `DELETE /posts/:id` — delete a post (auth required)
- `PATCH /posts/:id/likePost` — like a post (auth required)

### Users
- `POST /user/signin` — sign in
- `POST /user/signup` — sign up (accepts an optional `letterboxdUsername`)
- `PATCH /user/:id` — update your own `letterboxdUsername` (auth required)

### Letterboxd
- `GET /letterboxd/friend-reviews?username=<username>` — fetch friends' recent reviews
- `GET /letterboxd/reviews/:id` — fetch a single review by ID
- `GET /letterboxd/match?userA=<username>&userB=<username>` — compatibility score (0-100) and shared films between two Letterboxd usernames
- `GET /letterboxd/matches?username=<username>` — ranks other Filmterest members (who have set a `letterboxdUsername`) by compatibility with `username`

## Letterboxd Integration Status

The Letterboxd API requires application approval. While the request is pending, the backend returns placeholder data flagged with `pending: true` for reviews and matches alike, and the UI shows a banner indicating the integration is awaiting approval. The placeholder "diary" for a given username is generated deterministically (seeded from the username), so match scores stay consistent across requests instead of changing randomly. Once credentials are added to the server `.env`, the integration switches to live data automatically — no code changes required.

## Letterboxd Matching

The "Matches" page (`/matches`) lets you:
- Enter your own Letterboxd username and someone else's to see a compatibility score, based on overlap in films watched and how similarly you rated the films you have both logged.
- Click "Find My Top Matches" to rank other Filmterest members who have added a Letterboxd username, by compatibility with you.

Setting your Letterboxd username on the Matches page also saves it to your profile (used for both this feature and the friend-reviews feed).
