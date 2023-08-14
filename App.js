import { View, Text } from 'react-native'
import React from 'react'
import { Router } from './src/routes/routes/Router'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
    // <SafeAreaView>
      <Router/>
    // </SafeAreaView>
  )
}

export default App