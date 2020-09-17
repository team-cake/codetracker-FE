import axios from "axios";

const topicDetailsFetched = (topic) => ({
  type: "TOPIC_DETAILS_FETCHED",
  payload: topic,
});

export const fetchTopicById = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`http://localhost:4000/topics/${id}`);

    dispatch(topicDetailsFetched(response.data.topic));
  };
};
