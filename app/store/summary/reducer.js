const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ALL_SUMMARIES':
			return [...state, ...action.payload]

		default:
			return state
	}
}
