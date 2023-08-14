import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar'
import Colors from '../constants/Colors';

const SocialLogin = ({
    iconName,
    title,
    ...props
}) => {
    const [authenticating, setAuthenticating] = useState(false);

    const handleSuccess = (response) => {

        // End OAuth sign in and close the modal
        setAuthenticating(false);
        setIsLoggedIn(true);
        console.log(response);
        Snackbar.show({
            text: 'Signup success',
            duration: Snackbar.LENGTH_SHORT
        })
        // OAuth Sign in successful.
    };

    const handleFailure = (error) => {
        // End OAuth sign in and close the modal
        setAuthenticating(false);
        console.log(error);
        // OAuth Sign in failed.
    };

    // const MyLayout = ({ WebViewComponent }) => (
    //         <RBSheet
    //             ref={refRBSheet}
    //             closeOnDragDown={true}
    //             closeOnPressMask={false}
    //             onClose={() => {
    //                 setAuthenticating(false);
    //             }}
    //             animationType='slide'
    //             height={100}
    //             customStyles={{
    //                 wrapper: {
    //                     backgroundColor: "transparent"
    //                 },
    //                 draggableIcon: {
    //                     backgroundColor: "#000"
    //                 }
    //             }}
    //         >
    //             <WebViewComponent/>
    //         </RBSheet>
    // );
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => {
                setAuthenticating(true)
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