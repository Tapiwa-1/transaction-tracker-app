import { StyleSheet, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import Screen from '../components/Screen'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppText from '../components/AppText'
import routes from '../navigation/routes'
import AuthContext from '../auth/context'
import ErrorMessage from '../components/ErrorMessage'
export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [name, setname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerError, setRegisterError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const authContext = useContext(AuthContext)

    const validateForms = () => {
        if (email === '' || password === '' || confirmPassword === '' || name === '') {
            setErrorMessage("Please Fill In all your details")
            setRegisterError(true)
            return true
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match')
            setRegisterError(true)
            return true
        }

        if (password.length < 6) {
            setErrorMessage('The password should be at least 6 characters')
            setRegisterError(true)
            return true
        }

        if ((!/\S+@\S+\.\S+/.test(email))) {
            setErrorMessage('Invalid email')
            setRegisterError(true)
            return true
        }
    }

    const handleRegister = async () => {
        if (validateForms()) return;
    
        try {
            const response = await fetch('http://192.168.1.106:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword
                })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setErrorMessage(data.message || 'Registration failed');
                setRegisterError(true);
                return;
            }
    
            Alert.alert('Success', 'Registration successful! Please log in.', [
                { text: 'OK', onPress: () => navigation.navigate(routes.LOGIN) }
            ]);
    
            setEmail('');
            setname('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setErrorMessage('Network error. Please try again.');
            setRegisterError(true);
        }
    };
    
    return (
        <Screen style={styles.container}>
            <AppText style={styles.heading}>Trans-Tracker</AppText>
            <ErrorMessage error={errorMessage} visible={registerError} />
            <AppTextInput icon={'person'} placeholder={'name'}
                autoCorrect={false}
                autoCapitalize="none"
                name={'name'}
                onChangeText={(text) => {
                    setname(text)
                    setRegisterError(false)
                }}
                value={name}
            />
            <AppTextInput
                icon={'email'}
                placeholder={'Email'}
                keyBoardType={'email-address'}
                name={'email'} autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => {
                    setEmail(text)
                    setRegisterError(false)
                }}
                value={email}
            />
            <AppTextInput
                icon={'lock'}
                placeholder={'Password'}
                textContentType={'password'}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                name={'password'}
                onChangeText={(text) => {
                    setPassword(text)
                    setRegisterError(false)
                }}
                value={password}
            />
            <AppTextInput icon={'lock'}
                placeholder={'Confirm Password'}
                textContentType={'password'}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                name={'confirm-password'}
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text)
                    setRegisterError(false)
                }} />
            <AppButton title={'Register'} onPress={handleRegister} />
            <AppButton title={'Log in'} onPress={() => navigation.navigate(routes.LOGIN)} />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 25,
        marginVertical: 10
    }
})
//handle register with the following APL_URL http://192.168.1.106:8000