import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import routes from './routes'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createStackNavigator()

const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={routes.LOGIN} component={LoginScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />

        </Stack.Navigator>
    )
}

export default AuthNavigation

const styles = StyleSheet.create({})

//Login Screen
