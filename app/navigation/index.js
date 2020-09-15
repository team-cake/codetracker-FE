import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import AuthNav from './AuthNav'
import AppNav from './AppNav'

export default function Navigation() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	)
}

const Stack = createStackNavigator()

function RootNavigator() {
	const user = useSelector((state) => state.user)
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* {(!user || !user.token) && (
				<Stack.Screen name='AuthNav' component={AuthNav} />
			)}
			{user && user.token && <Stack.Screen name='AppNav' component={AppNav} />} */}
			{/* When the user is able to log in, we will use above logic */}

			{/* <Stack.Screen name='AuthNav' component={AuthNav} /> */}
			{/* This one is for the login and sign up */}

			<Stack.Screen name='AppNav' component={AppNav} />
			{/* this one is for the dashboard etc, comment out line 28 and refresh if you want to see dashboard etc */}
		</Stack.Navigator>
	)
}