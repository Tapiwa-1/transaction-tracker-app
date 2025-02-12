import { StyleSheet, Alert, Text, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import Screen from '../components/Screen'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppText from '../components/AppText'
import routes from '../navigation/routes'
import AuthContext from '../auth/context'
import ErrorMessage from '../components/ErrorMessage'
import { API_URL } from '@env';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerError, setRegisterError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const authContext = useContext(AuthContext)

    const validateForms = () => {
        if (email === '' || password === '' || confirmPassword === '' || name === '') {
            setErrorMessage("Please fill in all your details")
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

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Invalid email')
            setRegisterError(true)
            return true
        }
    }

    const handleRegister = async () => {
        if (validateForms()) return;
    
        try {
            const response = await fetch(`${API_URL}/register`, {
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
            setName('');
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
            <AppTextInput icon={'person'} placeholder={'Name'}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => {
                    setName(text)
                    setRegisterError(false)
                }}
                value={name}
            />
            <AppTextInput
                icon={'email'}
                placeholder={'Email'}
                keyboardType={'email-address'}
                autoCorrect={false}
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
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text)
                    setRegisterError(false)
                }} />
            <AppButton title={'Register'} onPress={handleRegister} />
            
            <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
                <Text style={styles.loginText}>If you have an account, <Text style={styles.loginLink}>click here</Text></Text>
            </TouchableOpacity>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    heading: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 20,
        color: '#333',
    },
    loginText: {
        fontSize: 16,
        color: '#7C7C7C',
        marginTop: 20,
    },
    loginLink: {
        color: '#007AFF',
        fontWeight: '500',
    }
});
