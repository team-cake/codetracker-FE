const initialState = {
  stories: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "TOPIC_DETAILS_FETCHED":
      return { ...state, ...payload };

    default:
      return state;
  }
};
