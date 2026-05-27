# Filterest

A social media app for sharing posts and viewing friends' Letterboxd reviews. Users can sign up, sign in (including with Google), create and like posts, and see a feed of reviews their friends have left on Letterboxd.

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

Create a `.env` file in the `server/` directory:

```
con_url=<your MongoDB connection string>
PORT=7000
LETTERBOXD_API_BASE=https://api.letterboxd.com/api/v0
LETTERBOXD_API_KEY=<your Letterboxd API key>
LETTERBOXD_API_SECRET=<your Letterboxd API secret>
```

If `LETTERBOXD_API_KEY` is not set, the `/letterboxd/friend-reviews` endpoint returns placeholder data so the UI still renders.

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
- `POST /user/signup` — sign up

### Letterboxd
- `GET /letterboxd/friend-reviews?username=<username>` — fetch friends' recent reviews
- `GET /letterboxd/reviews/:id` — fetch a single review by ID

## Letterboxd Integration Status

The Letterboxd API requires application approval. While the request is pending, the backend returns placeholder data flagged with `pending: true`, and the UI shows a banner indicating the integration is awaiting approval. Once credentials are added to the server `.env`, the integration switches to live data automatically — no code changes required.
