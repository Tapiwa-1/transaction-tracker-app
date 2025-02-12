import { StyleSheet, Text, TextInput, View , Alert} from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Screen from '../components/Screen'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppText from '../components/AppText'
import routes from '../navigation/routes'
import ErrorMessage from '../components/ErrorMessage'
import AuthContext from '../auth/context'
import authStorage from '../auth/authStorage'



export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const authContext = useContext(AuthContext)
    
    const validateForms = () => {
        if (email === '' || password === '') {
            setErrorMessage("Please Fill In all your details")
            setEmail('')
            setPassword('')
            setLoginError(true)
            return 1
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Invalid email')
            setEmail('')
            setPassword('')
            setLoginError(true)
            return 1
        }

    }

    const handleLogin = async () => {
        if (validateForms()) return;
    
        try {
            const response = await fetch('http://192.168.1.106:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setErrorMessage(data.message || 'Login failed');
                setLoginError(true);
                return;
            }
    
            // Store token and user details
            await authStorage.storeToken(data.token);
            authContext.setUser(data.user); // Update user in context
    
            console.log('User Set',data.user);
            setEmail('');
            setPassword('');
    
    
        } catch (error) {
            setErrorMessage('Network error. Please try again.');
            setLoginError(true);
        }
    };
    
    

    const handleRegister = async () => {
        setLoginError(false);
        navigation.navigate(routes.REGISTER);
    };



    return (
        <Screen style={styles.container}>
            <AppText style={styles.heading}>Trans-Tracker</AppText>
            <ErrorMessage visible={loginError} error={errorMessage} />
            <AppTextInput icon={'email'} placeholder={'Email'} keyBoardType={'email-address'}
                value={email}
                onChangeText={(text) => {
                    setEmail(text)
                    setLoginError(false)
                }} autoCorrect={false} autoCapitalize="none" name={'email'} />
            <AppTextInput icon={'lock'} placeholder={'Password'} textContentType={'password'}
                value={password}
                onChangeText={(text) => {
                    setPassword(text)
                    setLoginError(false)
                }} autoCorrect={false} autoCapitalize="none" secureTextEntry />
            <AppButton title={'Log in'} onPress={handleLogin} />
            <AppButton title={'Register'} onPress={handleRegister}
            />
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
