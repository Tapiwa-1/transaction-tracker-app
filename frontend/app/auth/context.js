import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    setUser: () => {}, // Function to update the user
});

export default AuthContext;
