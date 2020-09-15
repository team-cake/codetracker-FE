const initialState = {
	summaries: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ALL_SUMMARIES':
			return {
				...state,
				summaries: action.payload,
			}

		default:
			return state
	}
}
