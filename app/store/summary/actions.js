import axios from 'axios'
import { apiUrl } from '../../config/constants'

export const fetchSummaries = () => {
	// console.log('do i get here')
	return async (dispatch, getState) => {
		// console.log('do i get here too as well or not?')
		try {
			const response = await axios.get(`http://localhost:4000/summaries`)
			const summaries = response.data
			// console.log('fetchSummaries -> summaries', summaries)
			// console.log('do i get here 3')
			dispatch({ type: 'ALL_SUMMARIES', payload: summaries })
		} catch (error) {
			console.log(error.message)
		}
	}
}

export const createSummary = (description, userId, topicId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await axios.post(`${apiUrl}/topics/:id`, {
			description,
			userId,
			topicId
    }, {
      headers: { Authorization: `Bearer ${selectToken(state)}` }
    })

    console.log("RESPONSE:", response)
  };
};

