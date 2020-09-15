
import { combineReducers } from "redux";
import appState from "./appState/reducer";
import topics from "./topics/reducer";
import topicDetails from "./topicDetails/reducer";
import user from './user/reducer'

export default combineReducers({
  appState,
  topics,
  topicDetails,
  user,
});

