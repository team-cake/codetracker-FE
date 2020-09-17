import * as React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import DashboardScreen from '../screens/DashboardScreen'
import TopicListScreen from '../screens/TopicListScreen'
import SummaryListScreen from '../screens/SummaryListScreen'
import SettingScreen from '../screens/SettingScreen'
import TopicDetailScreen from '../screens/TopicDetailScreen'
import { createStackNavigator } from '@react-navigation/stack'

const TopicsStack = createStackNavigator()
const DashboardStack = createStackNavigator()
const SummariesStack = createStackNavigator()

function TopicsStackScreen() {
	return (
		<TopicsStack.Navigator>
			<TopicsStack.Screen
				name='Topics'
				component={TopicListScreen}
				options={{ headerShown: false }}
			/>
			<TopicsStack.Screen
				name='TopicDetail'
				component={TopicDetailScreen}
				options={{ title: false }}
			/>
		</TopicsStack.Navigator>
	)
}

function DashboardStackScreen() {
	return (
		<DashboardStack.Navigator>
			<DashboardStack.Screen
				name='Dashboard'
				component={DashboardScreen}
				options={{ headerShown: false }}
			/>
			<DashboardStack.Screen
				name='Summaries'
				component={SummaryListScreen}
				options={{ title: true }}
			/>
			<DashboardStack.Screen
				name='Topics'
				component={TopicListScreen}
				options={{ title: true }}
			/>
			<DashboardStack.Screen
				name='TopicDetail'
				component={TopicDetailScreen}
				options={{ title: true }}
			/>
		</DashboardStack.Navigator>
	)
}

function SummariesStackScreen() {
	return (
		<SummariesStack.Navigator>
			<SummariesStack.Screen
				name='Summaries'
				component={SummaryListScreen}
				options={{ headerShown: false }}
			/>
			<SummariesStack.Screen
				name='TopicDetail'
				component={TopicDetailScreen}
				options={{ title: false }}
			/>
		</SummariesStack.Navigator>
	)
}

const Tab = createBottomTabNavigator()

export default function AppNav() {
	return (
		<Tab.Navigator initialRouteName='Dashboard'>
			<Tab.Screen
				lazy={false}
				name='Topic List'
				component={TopicsStackScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='assignment' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				lazy={false}
				name='Dashboard'
				component={DashboardStackScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='dashboard' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				lazy={false}
				name='Summary List'
				component={SummariesStackScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='comment' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}
