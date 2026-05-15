const initialState = {
  loading: false,
  pending: false,
  reviews: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FRIEND_REVIEWS_LOADING':
      return { ...state, loading: true, error: null };
    case 'FETCH_FRIEND_REVIEWS':
      return {
        ...state,
        loading: false,
        pending: !!action.payload?.pending,
        reviews: action.payload?.reviews || [],
      };
    case 'FRIEND_REVIEWS_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
