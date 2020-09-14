import React from 'react'
import { StyleSheet, Text, StatusBar, View } from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<Text>WELCOME TO CODETRACKER</Text>
			<StatusBar setHidden={false} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
