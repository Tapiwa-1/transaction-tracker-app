import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './app/navigation/AuthNavigation';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/authStorage';

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Manage the token state

  // Function to check if the token exists
  const checkToken = async () => {
    const storedToken = await authStorage.getToken(); // Get the token from storage
    if (storedToken) {
      console.log('Token found:', storedToken);
      setToken(storedToken); // Update the token state

      
    } else {
      console.log('No token found.');
      setToken(null); // Ensure token is null if not found
    }
  };

  // Run the checkToken function when the app starts
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {(user) ? <AppNavigator /> : <AuthNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

