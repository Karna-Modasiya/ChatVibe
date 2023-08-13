import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};






