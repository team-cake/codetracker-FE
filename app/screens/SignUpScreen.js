import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../store/user/selectors'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { signUp } from '../store/user/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignUpScreen() {
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [classNumber, setClassNumber] = useState()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [image, setImage] = useState('')
	const [showError, setShowError] = useState('')
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const navigation = useNavigation()

	async function onPress(event) {
		// event.preventDefault();

		console.log("new user details:", {
      name,
      surname,
      classNumber,
      email,
      password,
      image
    })

    dispatch(signUp(name, surname, classNumber, email, password, image));

    setName("");
    setSurname("");
    setClassNumber();
    setEmail("");
    setPassword("");
    setImage("");
	}

	return (
		<>
			<KeyboardAwareScrollView>
				<View style={styles.container}>
					<View style={{ height: 50 }} />
					<View style={{ height: 20 }} />
					<View style={{ width: 250 }}>
						<Text style={styles.title}>Sign Up</Text>
						<TextInput
							onChange={(event) => setName(event.target.value)}
							value={name}
							keyboardType='default'
							placeholder='First Name'
						/>
						<View style={{ height: 10 }} />
						<TextInput
							onChange={(event) => setSurname(event.target.value)}
							value={surname}
							keyboardType='default'
							placeholder='Last Name'
						/>
						<View style={{ height: 10 }} />

						<TextInput
							onChange={(event) => setEmail(event.target.value)}
							value={email}
							autoCapitalize='none'
							autoCorrect={false}
							keyboardType='email-address'
							placeholder='Email'
						/>
						<View style={{ height: 10 }} />

						<TextInput
							secureTextEntry={true}
							onChange={(event) => setPassword(event.target.value)}
							value={password}
							autoCapitalize='none'
							autoCorrect={false}
							secureTextEntry={true}
							placeholder='Password'
						/>
						<View style={{ height: 10 }} />

						<TextInput
							onChange={(event) => setClassNumber(event.target.value)}
							value={classNumber}
							keyboardType='number-pad'
							placeholder='Class Number'
						/>
						<View style={{ height: 10 }} />

						<TextInput
							onChange={(event) => setImage(event.target.value)}
							value={image}
							placeholder='Image'
						/>
						<View style={{ height: 5 }} />
						<View style={{ height: 10 }}>
							{showError.length > 0 && (
								<Text
									style={{ color: 'red', fontSize: 12, textAlign: 'center' }}
								>
									{showError}
								</Text>
							)}
						</View>
						<View style={{ height: 20 }} />
						<Button
							title={loading ? 'Loading...' : 'Sign up'}
							onPress={() =>
								onPress(
									name,
									surname,
									classNumber,
									email,
									password,
									image,
									
								)
							}
						/>
						<View style={{ height: 20 }} />
						<View style={{ height: 20 }} />
					</View>
				</View>
			</KeyboardAwareScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 36,
		marginBottom: 16,
		textAlign: 'center',
	},
})
