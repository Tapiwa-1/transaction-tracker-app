import { StyleSheet, Alert } from 'react-native';
import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from '../components/MaterialIcon';
import routes from './routes';
import TransactionsScreen from '../screens/TransactionsScreen';

import { useNavigation } from '@react-navigation/native';
import authStorage from '../auth/authStorage';
import AuthContext from '../auth/context'


const Tab = createBottomTabNavigator();

const LogoutScreen = () => {
    const navigation = useNavigation();
    const authContext = useContext(AuthContext)
    React.useEffect(() => {
        const handleLogout = async () => {
            try {
                await authStorage.removeToken(); // Remove the token
                await fetch('http://192.168.1.106:8000/api/logout', {
                    method: 'POST',
                });
                Alert.alert('Logged Out', 'You have been logged out successfully.', [
                    {
                        text: 'OK',
                        onPress: () => {
                            authContext.setUser(null)
                            authStorage.removeToken()
                        },
                    },
                ]);
            } catch (error) {
                Alert.alert('Error', 'Failed to log out.');
            }
        };

        handleLogout();
    }, []);

    return null; // No UI needed, just handle logout
};

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name={routes.TRANSACTIONS} 
                component={TransactionsScreen} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (<MaterialIcon name="photo" size={size} color={color} />) 
                }} 
            />
            <Tab.Screen 
                name="Logout" 
                component={LogoutScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (<MaterialIcon name="logout" size={size} color={color} />),
                }} 
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({});
