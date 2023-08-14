import React, { useState } from 'react'
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Colors from '../../constants/Colors';

//Routes
import { AppStack } from '../routes/AppStack';
import { AuthStack } from '../routes/AuthStack';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.background,
    },
  };

export const Router = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    return (
        <NavigationContainer theme={theme}>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
