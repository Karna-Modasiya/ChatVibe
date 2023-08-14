import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser,setCurrentUser] = useState({});
    
    // Handle user state changes
    function onAuthStateChanged(user) {
        setIsLoggedIn(user);
        setCurrentUser(user);
    }

    function logout()
    {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        logout
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;