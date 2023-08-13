import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import OnboardingScreen from '../screens/OnBording';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='OnBording' component={OnboardingScreen} />
        </Stack.Navigator>
    );
}



