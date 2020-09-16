const initialState = {
  userTopics: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_TOPICS_FETCHED":
      return {
        ...state,
        userTopics: action.payload,
      };

    default:
      return state;
  }
};
