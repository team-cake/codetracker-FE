import { apiUrl } from '../../config/constants'
import axios from 'axios'
import { selectToken, selectUser } from './selectors'
import {
	appLoading,
	appDoneLoading,
	showMessageWithTimeout,
	setMessage,
} from '../appState/actions'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const TOKEN_STILL_VALID = 'TOKEN_STILL_VALID'
export const LOG_OUT = 'LOG_OUT'

export const loginSuccess = (payload) => {
	return {
		type: LOGIN_SUCCESS,
		payload,
	}
}

const tokenStillValid = (userWithoutToken) => ({
	type: TOKEN_STILL_VALID,
	payload: userWithoutToken,
})

export const logOut = () => ({ type: LOG_OUT })

export const signUp = (name, surname, classNumber, email, password, image) => {
  console.log("INSIDE SIGNUP FUNCTION", {
    name,
    surname,
    classNumber,
    email,
    password,
    image,
  })
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        surname,
        classNumber,
        email,
        password,
        image
      });

      console.log("RESPONSE DATA", response.data)
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
	console.log(email, password)
	return async (dispatch, getState) => {
		dispatch(appLoading())
		try {
			const loginLink = `${apiUrl}/login`
			console.log('connecting to:', loginLink)
			const response = await axios.post(loginLink, {
				email,
				password,
			})

			console.log('Got here! RESPONSE DATA:', response.data)
			dispatch(loginSuccess(response.data))
			dispatch(showMessageWithTimeout('success', false, 'welcome back!', 1500))
			dispatch(appDoneLoading())
		} catch (error) {
			if (error.response) {
				console.log('error log 1:', error.response.data.message)
				dispatch(setMessage('danger', true, error.response.data.message))
			} else {
				console.log('error log 2:', error)
				dispatch(setMessage('danger', true, error.message))
			}
			dispatch(appDoneLoading())
		}
	}
}

export const getUserWithStoredToken = () => {
	return async (dispatch, getState) => {
		// get token from the state
		const token = selectToken(getState())

		// if we have no token, stop
		if (token === null) return

		dispatch(appLoading())
		try {
			// if we do have a token,
			// check wether it is still valid or if it is expired
			const response = await axios.get(`${apiUrl}/me`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			// token is still valid
			dispatch(tokenStillValid(response.data))
			dispatch(appDoneLoading())
		} catch (error) {
			if (error.response) {
				console.log(error.response.message)
			} else {
				console.log(error)
			}
			// if we get a 4xx or 5xx response,
			// get rid of the token by logging out
			dispatch(logOut())
			dispatch(appDoneLoading())
		}
	}
}
