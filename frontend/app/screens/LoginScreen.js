import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import AppText from '../components/AppText';
import routes from '../navigation/routes';
import ErrorMessage from '../components/ErrorMessage';
import AuthContext from '../auth/context';
import authStorage from '../auth/authStorage';
import { API_URL } from '@env';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const authContext = useContext(AuthContext);

    const validateForms = () => {
        if (email === '' || password === '') {
            setErrorMessage('Please fill in all your details');
            setLoginError(true);
            return 1;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Invalid email');
            setLoginError(true);
            return 1;
        }
    };

    const handleLogin = async () => {
        if (validateForms()) return;

        try {
            const response = await fetch(`${API_URL}/login`, {
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

            console.log('User Set', data.user);
            setEmail('');
            setPassword('');

        } catch (error) {
            setErrorMessage('Network error. Please try again.');
            setLoginError(true);
        }
    };

    return (
        <Screen style={styles.container}>
            <AppText style={styles.heading}>Trans-Tracker</AppText>
            <ErrorMessage visible={loginError} error={errorMessage} />

            <AppTextInput 
                icon={'email'} 
                placeholder={'Email'} 
                keyBoardType={'email-address'}
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    setLoginError(false);
                }} 
                autoCorrect={false} 
                autoCapitalize="none" 
                name={'email'} 
            />
            
            <AppTextInput 
                icon={'lock'} 
                placeholder={'Password'} 
                textContentType={'password'}
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setLoginError(false);
                }} 
                autoCorrect={false} 
                autoCapitalize="none" 
                secureTextEntry 
            />
            
            <AppButton title={'Log in'} onPress={handleLogin} />

            <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)}>
                <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Click here</Text></Text>
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F8F9FA', // iOS-like background
    },
    heading: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 20,
        color: '#333',
    },
    registerText: {
        fontSize: 16,
        color: '#7C7C7C',
        marginTop: 20,
    },
    registerLink: {
        color: '#007AFF', // iOS blue
        fontWeight: '500',
    }
});
