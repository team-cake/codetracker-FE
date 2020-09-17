import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/user/selectors'

export default function SignUpConfScreen() {
	const user = useSelector(selectUser)


	// {user && user.token && <Stack.Screen name='AppNav' component={AppNav} />}

	return (
		<View style={styles.container}>
			<Text h1>Thank you for signing up!</Text>
			<Text h3>We have sent a confirmation to your email address</Text>
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
