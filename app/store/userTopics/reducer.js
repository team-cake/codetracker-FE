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
    case "ADD_USER_TOPIC":
      return {
        ...state,
        userTopics: [...state.userTopics, action.payload],
      };

    default:
      return state;
  }
};
