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
