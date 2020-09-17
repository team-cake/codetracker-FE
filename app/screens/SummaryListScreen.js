import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { fetchSummaries } from '../store/summary/actions'
import { selectSummaries } from '../store/summary/selectors'
import { selectUserSummaries } from '../store/user/selectors'
import { selectUser } from '../store/user/selectors'
import { Button, CheckBox, Spinner } from 'monalisa-ui'

export default function SummaryListScreen({ navigation }) {
	const dispatch = useDispatch()
	const { summaries } = useSelector(selectSummaries)
	console.log('SummaryListScreen -> summaries', summaries)

	const summary = useSelector(selectUserSummaries)
	console.log('SummaryListScreen -> summary', summary)

	const user = useSelector(selectUser)

	useEffect(() => {
		dispatch(fetchSummaries())
	}, [dispatch])

	return (
		<View style={styles.container}>
			<Text style={styles.small}>SummaryListScreen</Text>
			<View style={{ height: 20 }} />
			{/* <Text>Below are the summaries of all users</Text>
			{summaries ? (
				summaries.map((s) => {
					return (
						<Button
							key={s.id}
							title={s.description}
							onPress={() =>
								navigation.navigate('TopicDetail', {
									id: s.id,
								})
							}
						/>
					)
				})
			) : (
				<Spinner titleStyle={{ fontSize: 16 }} title='Loading...' />
			)} */}
			<View style={{ height: 20 }} />
			<Text>Here below is {user.name}'s summary</Text>
			{summary ? (
				summary.map((s) => {
					return (
						<Button
							key={s.id}
							title={s.description}
							onPress={() =>
								navigation.navigate('TopicDetail', {
									id: s.id,
								})
							}
						/>
					)
				})
			) : (
				<Spinner titleStyle={{ fontSize: 16 }} title='Loading...' />
			)}
			<View style={{ height: 220 }} />
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
	small: {
		fontSize: 30,
	},
})
