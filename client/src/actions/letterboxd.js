import * as api from '../api/index.js';

export const getFriendReviews = (username) => async (dispatch) => {
  try {
    dispatch({ type: 'FRIEND_REVIEWS_LOADING' });
    const { data } = await api.fetchFriendReviews(username);
    dispatch({ type: 'FETCH_FRIEND_REVIEWS', payload: data });
  } catch (error) {
    dispatch({ type: 'FRIEND_REVIEWS_ERROR', payload: error.message });
  }
};

export const getMatch = (userA, userB) => async (dispatch) => {
  try {
    dispatch({ type: 'MATCH_LOADING' });
    const { data } = await api.fetchMatch(userA, userB);
    dispatch({ type: 'FETCH_MATCH', payload: data });
  } catch (error) {
    dispatch({ type: 'MATCH_ERROR', payload: error.response?.data?.message || error.message });
  }
};

export const getMatches = (username) => async (dispatch) => {
  try {
    dispatch({ type: 'MATCHES_LOADING' });
    const { data } = await api.fetchMatches(username);
    dispatch({ type: 'FETCH_MATCHES', payload: data });
  } catch (error) {
    dispatch({ type: 'MATCHES_ERROR', payload: error.response?.data?.message || error.message });
  }
};
