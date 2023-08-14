import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

export const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => { },
    ...props
}) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: error
                            ? Colors.red
                            : isFocused
                                ? Colors.primaryText
                                : Colors.gray,
                        alignItems: 'center',
                    },
                ]}>
                <Icon
                    name={iconName}
                    style={styles.iconStyle}
                />
                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    style={{ color: Colors.primaryText, flex: 1 }}
                    placeholderTextColor={Colors.gray}
                    {...props}
                />
                {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        style={styles.inputText}
                    />
                )}
            </View>
            {error && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    iconStyle: {
        color: Colors.primaryText,
        fontSize: 22,
        marginRight: 10
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: Colors.primaryText,
        fontWeight: 'bold'
    },
    inputContainer: {
        height: 55,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
    },
    inputText: {
        color: Colors.primaryText,
        fontSize: 22
    },
    error: {
        marginTop: 7, color: Colors.red, fontSize: 12
    }
})