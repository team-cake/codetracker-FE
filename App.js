import React from 'react'
import { Provider } from 'react-redux'
import store from './app/store'
import Navigation from './app/navigation'

export default function App() {
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	)
}
