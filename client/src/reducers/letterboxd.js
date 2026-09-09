const initialState = {
  loading: false,
  pending: false,
  reviews: [],
  error: null,
  matchLoading: false,
  match: null,
  matchError: null,
  matchesLoading: false,
  matches: [],
  matchesPending: false,
  matchesError: null,
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
    case 'MATCH_LOADING':
      return { ...state, matchLoading: true, matchError: null };
    case 'FETCH_MATCH':
      return { ...state, matchLoading: false, match: action.payload };
    case 'MATCH_ERROR':
      return { ...state, matchLoading: false, matchError: action.payload };
    case 'MATCHES_LOADING':
      return { ...state, matchesLoading: true, matchesError: null };
    case 'FETCH_MATCHES':
      return {
        ...state,
        matchesLoading: false,
        matches: action.payload?.matches || [],
        matchesPending: !!action.payload?.pending,
      };
    case 'MATCHES_ERROR':
      return { ...state, matchesLoading: false, matchesError: action.payload };
    default:
      return state;
  }
};
