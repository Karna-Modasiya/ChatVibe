import { View, Text } from 'react-native'
import React from 'react'
import { Router } from './src/routes/routes/Router'

const App = () => {
  return (
    <View style={{flex:1,backgroundColor:'white',justifyContent: 'center',alignItems: 'center'}}>
      <Router/>
    </View>
  )
}

export default App