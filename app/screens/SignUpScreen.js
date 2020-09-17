import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../store/user/selectors'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { signUp } from '../store/user/actions'
import { sendMail } from '../store/mail/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'

export default function SignUpScreen() {
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [classNumber, setClassNumber] = useState()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [selectedImage, setSelectedImage] = useState('')
	const [image, setImage] = useState('')
	const [showError, setShowError] = useState('')
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const navigation = useNavigation()
	const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/codetracker/image/upload';

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (pickerResult.cancelled === true) {
      return;
		}
		console.log("PICKERRESULT:", pickerResult)
		setSelectedImage({ localUri: pickerResult.uri });
		console.log("SELECTED IMAGE", selectedImage)
		
		//***IMPORTANT*** This step is necessary.  It converts image from 
		//file path format that imagePicker creates, into a form that cloudinary //requires.

		const base64Img = `${pickerResult.uri}`;
		console.log("BASE 64 IMAGE:", base64Img)

    const data = {
      "file": base64Img,
      "upload_preset": "CodeTracker",
    }

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
			console.log("R Here: ", r)
			const data = await r.json()
			console.log("Data Here:", data)
			console.log("Data url:", data.secure_url)
			const dataUrl = data.secure_url
			setImage(dataUrl);
			console.log("data url at the end:", dataUrl)
		}).catch(err => console.log(err))
	};
	
	// async function submitForm () {
  //   try {
  //     await dispatch(sendMail(to, user.email, subject, text))
  //     history.push("/mail/sent")
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
		
		try {
			await dispatch(sendMail(email))
		} catch (err) {
			console.log("THIS IS THE ERROR:", err.message)
		}

    setName("");
    setSurname("");
    setClassNumber();
    setEmail("");
    setPassword("");
		setImage("");

		navigation.push("SignUpConf")
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

						<Button
							onPress={openImagePickerAsync}
							// value={selectedImage}
							title="Choose a profile picture"
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
							title={!image || !name || !surname || !classNumber || !email || !password ? 'Please enter your details...' : 'Sign up'}
							onPress={() => image ? 
								onPress(
									name,
									surname,
									classNumber,
									email,
									password,
									image,
									
								) : null
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
