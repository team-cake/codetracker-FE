import { combineReducers } from "redux";
import appState from "./appState/reducer";
import topics from "./topics/reducer";
import topicDetails from "./topicDetails/reducer";
import summary from "./summary/reducer";
import user from "./user/reducer";
import userTopics from "./userTopics/reducer";

export default combineReducers({
  appState,
  user,
  topics,
  topicDetails,
  summary,
  userTopics,
});
