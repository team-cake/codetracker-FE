import * as React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import DashboardScreen from '../screens/DashboardScreen'
import TopicListScreen from '../screens/TopicListScreen'
import SummaryListScreen from '../screens/SummaryListScreen'

import SettingScreen from '../screens/SettingScreen'

const Tab = createBottomTabNavigator()

export default function AppNav() {
	return (
		<Tab.Navigator initialRouteName='Dashboard'>
			<Tab.Screen
				lazy={false}
				name='Topic List'
				component={TopicListScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='assignment' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				lazy={false}
				name='Dashboard'
				component={DashboardScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='dashboard' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				lazy={false}
				name='Summary List'
				component={SummaryListScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='comment' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}
