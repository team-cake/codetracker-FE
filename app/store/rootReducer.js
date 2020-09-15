import { combineReducers } from "redux";
import appState from "./appState/reducer";
import topics from "./topics/reducer";

export default combineReducers({
  appState,
  topics,
});
