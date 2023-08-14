import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar'
import Colors from '../constants/Colors';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const SocialLogin = ({
    iconName,
    title,
    ...props
}) => {

    useEffect(() => {
        GoogleSignin.configure({ webClientId: '871654022468-i99ke0tlge5cs7440kn58to6ltos6na4.apps.googleusercontent.com' });
    }, []);

    const handleGoogleAuth = async() => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the users ID token
            const profileInfo = await GoogleSignin.signIn();
            console.log(profileInfo);

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(profileInfo.idToken);

            console.log("Google Credentials : ",googleCredential);

            // Sign-in the user with the credential
            auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Snackbar.show({
                    text: 'Cancelled sign in ',
                    duration: Snackbar.LENGTH_SHORT,
                  })
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Snackbar.show({
                    text: 'Processing Sign in',
                    duration: Snackbar.LENGTH_SHORT,
                  })
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Snackbar.show({
                    text: 'Google Play Service is not available',
                    duration: Snackbar.LENGTH_SHORT,
                  })
            } else {
                // some other error happened
            }
        }
    }
    
    const handleAuthProviders = ()=>{
        if(title === "Google")
            handleGoogleAuth();
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => {
                handleAuthProviders();
            }}>
                <Icon
                    name={iconName}
                    style={styles.iconStyle}
                />
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        width: 90,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        color: Colors.secondaryText,
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 13,
    },
    iconStyle: {
        color: Colors.secondaryText,
        fontSize: 30
    },
})

export default SocialLogin