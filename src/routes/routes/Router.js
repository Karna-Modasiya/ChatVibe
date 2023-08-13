import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

//Routes
import { AppStack } from '../routes/AppStack';
import { AuthStack } from '../routes/AuthStack';

export const Router = () => {
    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
