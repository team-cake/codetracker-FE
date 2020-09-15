import { combineReducers } from 'redux'
import appState from './appState/reducer'
import summary from './summary/reducer'

export default combineReducers({
	appState,
	topics,
	topicDetails,
})
