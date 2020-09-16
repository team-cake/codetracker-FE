const initialState = {
  topics: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TOPICS_FETCHED":
      return {
        ...state,
        topics: action.payload,
      };

    default:
      return state;
  }
};
