import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getSummaries } from '../store/summary/selector'
import { fetchSummaries } from '../store/summary/actions'

export default function SummaryListScreen() {
	const dispatch = useDispatch()
	const summaries = useSelector(getSummaries)
	console.log('SummaryListScreen -> summaries', summaries.summaries)

	useEffect(() => {
		dispatch(fetchSummaries())
	}, [dispatch])

	return (
		<View style={styles.container}>
			<Text>SummaryListScreen, what what</Text>
			{/* {summaries.map((s) => {
				return <Text>{s.description}</Text>
			})} */}
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
