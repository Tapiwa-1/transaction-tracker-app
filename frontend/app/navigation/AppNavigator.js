import { StyleSheet, Alert } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from '../components/MaterialIcon';
import routes from './routes';
import TransactionsScreen from '../screens/TransactionsScreen';

import { useNavigation } from '@react-navigation/native';
import authStorage from '../auth/authStorage';

const Tab = createBottomTabNavigator();

const LogoutScreen = () => {
    const navigation = useNavigation();

    React.useEffect(() => {
        const handleLogout = async () => {
            try {
                await authStorage.removeToken(); // Remove the token

                Alert.alert('Logged Out', 'You have been logged out successfully.', [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: routes.LOGIN }], // Reset stack to LOGIN screen
                            });
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
