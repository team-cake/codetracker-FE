import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/user/actions'
import { selectUser, selectUserSummaries } from '../store/user/selectors'
import {
	Avatar,
	Button,
	Card,
	Col,
	ProgressBar,
	Row,
	Spinner,
	Text,
} from 'monalisa-ui'
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler'
import { selectTopics } from '../store/topics/selectors'
import { selectUserTopics } from '../store/userTopics/selectors'
import { fetchUserTopics } from '../store/userTopics/actions'
import { fetchTopics } from '../store/topics/actions'

Date.prototype.getWeek = function () {
	let today = new Date()
	return Math.ceil(((today - this) / 86400000 + today.getDay() + 1) / 7)
}

export default function DashboardScreen({ navigation }) {
	const [progressBar, setProgressBar] = useState(0)
	const [topicsToShow, setTopicsToShow] = useState([])
	const [dt, setDt] = useState(new Date().toLocaleString())

	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const summary = useSelector(selectUserSummaries)
	const { topics } = useSelector(selectTopics)
	const { userTopics } = useSelector(selectUserTopics)

	useEffect(() => {
		let secTimer = setInterval(() => {
			setDt(new Date().toLocaleString())
		}, 1000)

		return () => clearInterval(secTimer)
	}, [])

	let userRegDate = user ? user.createdAt : ''
	let myDate = new Date(userRegDate)
	const weekId = myDate.getWeek().toString()
	const filteredTopics = topics.filter((t) => {
		return Number(t.week) === parseInt(weekId)
	})

	useEffect(() => {
		setTopicsToShow(filteredTopics)
	}, [topics])

	useEffect(() => {
		dispatch(fetchUserTopics())
		dispatch(fetchTopics())
	}, [dispatch])

	function onPress() {
		dispatch(logOut())
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={{ height: 20 }} />
				<Text>this is codetracker</Text>
				<View style={{ height: 20 }} />
				<Card
					bordered
					rounded
					style={{
						shadowOffset: { width: 2, height: 2 },
						shadowColor: '#333',
						shadowOpacity: 0.3,
						shadowRadius: 2,
						// width: Dimensions.get('window').width,
					}}
				>
					{user ? (
						<Row>
							<Avatar
								source={{ uri: user.image }}
								width={80}
								height={80}
								circle
							/>
							<Col>
								<Text style={styles.titleText}>
									Welcome {user.name} - class {user.classNumber}!
								</Text>
								<Text style={styles.datetimeText}>
									{moment(dt).format('MMM Do YYYY, h:mm:ss a')}
									{/* {moment(dt).format('llll')} */}
									{/* {moment().format('MMM Do YYYY')} - {moment().format('LT')} */}
								</Text>
							</Col>
						</Row>
					) : (
						<Spinner titleStyle={{ fontSize: 16 }} title='Loading...' />
					)}
				</Card>
				<View style={{ width: 400, marginTop: 10 }}>
					<ProgressBar
						style={{ marginBottom: 5 }}
						height={10}
						value={progressBar}
					/>
					<Text style={styles.smallText}>Your progress</Text>
					<View style={{ height: 20 }} />
				</View>

				<View>
					<Row content='space-between'>
						<Card
							bordered
							rounded
							style={{
								width: 225,
								height: 225,
								shadowOffset: { width: 2, height: 2 },
								shadowColor: '#333',
								shadowOpacity: 0.3,
								shadowRadius: 2,
							}}
						>
							<Col>
								<View style={{ height: 30 }} />
								<Text style={styles.headerText}>Topics of week #{weekId}</Text>
								<Text style={styles.smallTextBlue}>Tap to find out more</Text>
								<View style={{ height: 15 }} />
								{topicsToShow ? (
									topicsToShow.map((t) => {
										return (
											<View key={t.id}>
												<Button
													buttonStyle={styles.btn}
													title={t.name}
													onPress={() =>
														navigation.navigate('TopicDetail', {
															id: t.id,
														})
													}
													outline
												/>
											</View>
										)
									})
								) : (
									<Spinner titleStyle={{ fontSize: 16 }} title='Loading...' />
								)}
								<View style={{ height: 20 }} />
								{/* <Button
									buttonStyle={styles.btn}
									title='Topics this week'
									outline
									raised
									onPress={() => navigation.navigate('Topics')}
								/> */}
							</Col>
						</Card>
						<Card
							bordered
							rounded
							style={{
								width: 225,
								height: 225,
								shadowOffset: { width: 2, height: 2 },
								shadowColor: '#333',
								shadowOpacity: 0.3,
								shadowRadius: 2,
							}}
						>
							<Col>
								<View style={{ height: 30 }} />
								<Text style={styles.headerText}>Your Summaries</Text>
								<View style={{ height: 15 }} />
								{summary ? (
									summary.map((s) => {
										return (
											<Button
												key={s.id}
												title={s.description}
												outline
												raised
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
								<View style={{ height: 20 }} />
								<Button
									buttonStyle={styles.btn}
									title='See Summary List'
									outline
									raised
									onPress={() => navigation.navigate('Summaries')}
								/>
							</Col>
						</Card>
					</Row>
				</View>
				<View style={{ height: 20 }} />

				<Button
					buttonStyle={styles.btn}
					title='Log Out'
					outline
					raised
					onPress={() => onPress(logOut())}
				/>
				<View style={{ height: 500 }} />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	datetimeText: {
		fontSize: 15,
		marginBottom: 10,
	},
	titleText: {
		fontSize: 25,
		marginBottom: 10,
		textAlign: 'center',
	},
	headerText: {
		color: '#1b48ee',
		fontSize: 20,
		marginBottom: 10,
		textAlign: 'center',
	},
	smallText: {
		fontSize: 15,
		textAlign: 'center',
	},
	smallTextBlue: {
		color: '#1b48ee',
		fontSize: 15,
		textAlign: 'center',
	},
	card: {
		borderRadius: 6,
		elevation: 3,
		backgroundColor: '#fff',
		shadowOffset: { width: 2, height: 2 },
		shadowColor: '#333',
		shadowOpacity: 0.3,
		shadowRadius: 2,
		marginHorizontal: 4,
		marginVertical: 6,
		width: '225',
		height: '225',
	},
})
