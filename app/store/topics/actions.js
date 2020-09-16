import { apiUrl } from '../../config/constants'
import axios from 'axios'

export const topicsFetched = (topics) => ({
	type: 'TOPICS_FETCHED',
	payload: topics,
})

export const fetchTopics = () => {
	return async (dispatch, getState) => {
		const response = await axios.get(`http://localhost:4000/topics`)

		dispatch(topicsFetched(response.data.topics))
	}
}
