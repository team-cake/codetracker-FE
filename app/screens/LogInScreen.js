import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { login } from '../store/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, selectToken} from '../store/user/selectors'

export default function LogInScreen() {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	console.log('user => ', user)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [showError, setShowError] = useState('')

	async function onPress(event) {
		console.log("hi");
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
	}

	return (
		<View style={styles.container}>
			<View style={{ height: 20 }} />
			<View style={{ width: 250 }}>
				<TextInput
					style={styles.textInputLogin}
					onChange={event => setEmail(event.target.value)}
					value={email}
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='email-address'
					placeholder='email'
				/>
				<View style={{ height: 10 }} />

				<TextInput
					style={styles.textInputLogin}
					onChange={event => setPassword(event.target.value)}
					value={password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					placeholder='password'
				/>
				<View style={{ height: 10 }} />
				<View style={{ height: 10 }}>
					{showError.length > 0 && (
						<Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>
							{showError}
						</Text>
					)}
				</View>
				<View style={{ height: 30 }} />
				<Button
					title={loading ? 'Loading...' : 'Log In'}
					onPress={onPress}
				/>
				<View style={{ height: 60 }} />
				<Text
					title='Sign Up.'
					style={[styles.underline, { textAlign: 'center' }]}
					onPress={() => navigation.navigate('SignUp')}
				>
					No account yet? Sign up.
				</Text>
			</View>
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
