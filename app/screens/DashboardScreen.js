import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/user/actions'
import { selectUser, selectUserSummaries } from '../store/user/selectors'
import {
	Avatar,
	Button,
	Card,
	Col,
	Pricing,
	ProgressBar,
	Row,
	Spinner,
	Text,
} from 'monalisa-ui'
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler'
import { selectTopics } from '../store/topics/selectors'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/user/actions'

export default function DashboardScreen({ navigation }) {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	console.log('DashboardScreen -> user', user)
	const summary = useSelector(selectUserSummaries)
	console.log('DashboardScreen -> summary', summary)
	const topic = useSelector(selectTopics)

	const dispatch = useDispatch()

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
									{moment().format('MMM Do YYYY')} - {moment().format('LT')}
								</Text>
							</Col>
						</Row>
					) : (
						<Spinner titleStyle={{ fontSize: 16 }} title='Loading...' />
					)}
				</Card>
				<View style={{ width: 400, marginTop: 10 }}>
					<ProgressBar style={{ marginBottom: 5 }} height={10} value={80} />
					<Text style={styles.smallText}>Your progress</Text>
					<View style={{ height: 20 }} />
				</View>

				<View>
					<Row content='space-between'>
						<Card
							// height={550}
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
								<Text style={styles.headerText}>Topics this week</Text>
								<View style={{ height: 15 }} />
								<Text style={styles.smallText}>Value 2</Text>
								<Text style={styles.smallText}>Value 3</Text>
								<View style={{ height: 20 }} />
								<Button
									buttonStyle={styles.btn}
									title='Topics this week'
									outline
									raised
									onPress={() => navigation.navigate('Topics')}
								/>
							</Col>
						</Card>
						<Card
							// height={400}
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
					onPress={() => onPress(logOut())
          navigation.push("/login")
          }
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
		// fontFamily: 'Roboto-Light',
		fontSize: 15,
		marginBottom: 10,
	},
	titleText: {
		// fontFamily: 'Roboto-Light',
		fontSize: 25,
		marginBottom: 10,
		textAlign: 'center',
	},
	headerText: {
		// fontFamily: 'Roboto-Light',
		color: '#1b48ee',
		fontSize: 20,
		marginBottom: 10,
		textAlign: 'center',
	},
	smallText: {
		// fontFamily: 'Roboto-Light',
		fontSize: 15,
		// marginBottom: 10,
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
