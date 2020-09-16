import axios from "axios";
import { selectToken } from "../user/selectors";

export const userTopicsFetched = (userTopics) => ({
  type: "USER_TOPICS_FETCHED",
  payload: userTopics,
});

export const fetchUserTopics = () => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      if (token === null) return;
      const response = await axios.get(`http://localhost:4000/mytopics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("fetchUserTopics -> response", response.data.myTopics);

      dispatch(userTopicsFetched(response.data.myTopics));
    } catch (error) {
      console.log(error);
    }
  };
};
