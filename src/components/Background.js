import React from 'react'
import Colors from '../constants/Colors'
import LinearGradient from 'react-native-linear-gradient';

const Background = ({children}) => {
  return (
    <LinearGradient
        colors={[
            Colors.bgLineGradOne,
            Colors.bgLineGradTwo,
            Colors.bglineGradThree,
            Colors.bgLineGradFour,
            Colors.bgLineGradFive,
            Colors.bgLineGradSix,
        ]}
        style={{flex:1}}
    >
        {children}
    </LinearGradient>
  )
}

export default Background