import axios from 'axios';

// Points at the local Express server by default; override with
// REACT_APP_API_URL (in client/.env) once you deploy the server elsewhere.
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:7000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchFriendReviews = (username) => API.get('/letterboxd/friend-reviews', { params: { username } });
export const fetchLetterboxdReview = (id) => API.get(`/letterboxd/reviews/${id}`);
export const fetchMatch = (userA, userB) => API.get('/letterboxd/match', { params: { userA, userB } });
export const fetchMatches = (username) => API.get('/letterboxd/matches', { params: { username } });

export const updateProfile = (id, data) => API.patch(`/user/${id}`, data);
