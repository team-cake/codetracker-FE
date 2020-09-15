import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, StyleSheet, Text, View } from 'react-native'
import { fetchSummaries } from '../store/summary/actions'
import { selectSummaries } from '../store/summary/selector'

export default function SummaryListScreen({ navigation }) {
	const dispatch = useDispatch()
	const { summaries } = useSelector(selectSummaries)
	console.log('SummaryListScreen -> summaries', summaries)

	useEffect(() => {
		dispatch(fetchSummaries())
	}, [dispatch])

	return (
		<View style={styles.container}>
			<Text style={styles.small}>SummaryListScreen - her TEAM PREMIER</Text>
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
				<Text>Loading...</Text>
			)}
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
		size: 30,
	},
})
