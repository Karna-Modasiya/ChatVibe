import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';

const Login = () => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        GoogleSignin.configure({ webClientId: '871654022468-i99ke0tlge5cs7440kn58to6ltos6na4.apps.googleusercontent.com' });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const info = await GoogleSignin.signIn();
            console.log(info);
            setUserInfo(info);
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

        const signOut = async () => {
            try {
                await GoogleSignin.signOut();
                setUserInfo(null); // Remember to remove the user from your app's state as well
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {!userInfo ?
                    <Button title='Login' onPress={()=>{signIn()}}></Button>
                    :
                    <View>
                        <Button title='Log-out' onPress={()=>{signOut()}}></Button>
                        {/* <Text>{userInfo}</Text> */}
                    </View>

                }
                {/* <Text>Login</Text> */}
            </View>
        )
    }

export default Login;