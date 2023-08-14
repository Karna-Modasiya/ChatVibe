import { View, Text } from 'react-native'
import React from 'react'
import { Router } from './src/routes/routes/Router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthProvider } from './src/utils/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  )
}

export default App;