const alertReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_ALERT':
      return payload;
    case 'REMOVE_ALERT':
      return null;
    default:
      return state;
  }
};

export default alertReducer;
