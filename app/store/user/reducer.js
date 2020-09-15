import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from './actions'

const initialState = {
	token: null,
	data: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				token: action.payload.token,
				data: action.payload.user,
			}

		case LOG_OUT:
			return initialState

		case TOKEN_STILL_VALID:
			return { ...state, ...action.payload }

		default:
			return state
	}
}