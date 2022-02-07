const initialState = {};

const githubReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_USERS':
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default githubReducer;
