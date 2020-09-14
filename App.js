import React from 'react'
import { Provider } from 'react-redux'
import store from './app/store'
import { AppLoading } from 'expo'
import Navigation from './app/navigation'

export default function App() {
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	)
}

// import React from 'react'
// import { StyleSheet, Text, StatusBar, View } from 'react-native'
// import AppNav from './app/navigation/AppNav'
// import { NavigationContainer } from '@react-navigation/native'

// export default function App() {
// 	return (
// 		<NavigationContainer>
// 			<View style={styles.container}>
// 				<Text>WELCOME TO CODETRACKER</Text>
// 				<AppNav />
// 				<StatusBar setHidden={false} />
// 			</View>
// 		</NavigationContainer>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// })
