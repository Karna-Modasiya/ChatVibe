import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Button = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.secondary,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.secondaryText, 
        fontWeight: 'bold', 
        fontSize: 18
    }
})

export default Button;