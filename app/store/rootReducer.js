<<<<<<< HEAD
import { combineReducers } from 'redux'
import appState from './appState/reducer'
import summary from './summary/reducer'

export default combineReducers({
	appState,
	topics,
	topicDetails,
})
=======
import { combineReducers } from "redux";
import appState from "./appState/reducer";
import topics from "./topics/reducer";
import topicDetails from "./topicDetails/reducer";
export default combineReducers({
  appState,
  topics,
  topicDetails,
});
>>>>>>> 1e2bd9650b09fd2f9e95456974e0a83d6ddb7339
