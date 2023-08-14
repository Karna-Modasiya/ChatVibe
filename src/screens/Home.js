import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../utils/AuthContext'
import Button from '../components/Button';

const Home = () => {
  const {currentUser,logout} = useAuth();
  return (
    <View>
      {console.log(currentUser)}
      <Button title='Logout' onPress={logout}></Button>
      <Text>Home</Text>
    </View>
  )
}

export default Home