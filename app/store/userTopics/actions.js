import axios from "axios";
import { selectToken } from "../user/selectors";

export const userTopicsFetched = (userTopics) => ({
  type: "USER_TOPICS_FETCHED",
  payload: userTopics,
});

export const addUserTopic = (userTopic) => ({
  type: "ADD_USER_TOPIC",
  payload: userTopic,
});

export const fetchUserTopics = () => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      if (token === null) return;
      const response = await axios.get(`http://localhost:4000/mytopics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("fetchUserTopics -> response", response.data.myTopics);

      dispatch(userTopicsFetched(response.data.myTopics));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addingUserTopic = (topicId, userId) => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      if (token === null) return;
      const response = await axios.post(
        `http://localhost:4000/addusertopic`,

        {
          userId,
          topicId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("addingUserTopic -> response", response);
      dispatch(addUserTopic(response.data.addUserTopic));
    } catch (error) {
      console.log(error);
    }
  };
};
