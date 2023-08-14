import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar'
import Colors from '../constants/Colors';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken,Settings } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../utils/AuthContext';

const SocialLogin = ({
    iconName,
    title,
    ...props
}) => {

    const {setAuthType} = useAuth();

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
            auth().signInWithCredential(googleCredential)
                .then(()=>{
                    setAuthType("google");
                    console.log("Logged in using google")
                });
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

    const handleFacebookAuth = async() => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            Snackbar.show({
                text: 'Cancelled sign in ',
                duration: Snackbar.LENGTH_SHORT,
              })
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            Snackbar.show({
                text: 'Something went wrong',
                duration: Snackbar.LENGTH_SHORT,
              })
        }
        // console.log(data);
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        auth().signInWithCredential(facebookCredential)
            .then(() => {
                setAuthType("facebook");
                console.log('LOgged in using facebook');
            })
            .catch(error => {
                setLoading(false);
                if (error.code === 'auth/account-exists-with-different-credential') {
                    console.log('Account Already Exists');
                    Snackbar.show({
                    text: 'Account Already Exists',
                    duration: Snackbar.LENGTH_SHORT,
                    })
                }
                console.error(error);
            });
    }
    
    const handleAuthProviders = ()=>{
        if(title === "Google")
            handleGoogleAuth();
        else if(title === "Facebook")
            handleFacebookAuth();
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