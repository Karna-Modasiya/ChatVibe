import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Colors from '../constants/Colors';
import Loader from '../components/Loader';
import { Input } from '../components/Input';
import Button from '../components/Button';
import SocialLogin from '../components/SocialAuthProvider';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../utils/AuthContext';
import Background from '../components/Background';

const Signup = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    name: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.name) {
      handleError('Please input fullname', 'name');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    else if (inputs.password.length < 8) {
      handleError('Min password length of 8', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then(() => {
          setLoading(false);
          console.log('User account created & signed in!');
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use');
            Snackbar.show({
              text: 'That email address is already in use!',
              duration: Snackbar.LENGTH_SHORT,
            })
          }

          if (error.code === 'auth/invalid-email') {
            Snackbar.show({
              text: 'Invalid email',
              duration: Snackbar.LENGTH_SHORT,
            })
          }

          console.error(error);
        });
    }, 2000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Background>

        <Loader visible={loading} />
        <ScrollView
          contentContainerStyle={styles.inputContainer}>
          <Text style={styles.strongText}>
            Register
          </Text>
          <Text style={styles.lightText}>
            Enter Your Details to Register
          </Text>
          <View style={{ marginVertical: 20 }}>
            
          <Input
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              iconName="account-outline"
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.name}
            />
            <Input
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Email"
              placeholder="Enter your email address"
              error={errors.email}
            />
            <Input
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              password
            />
            <Button title="Submit" onPress={validate} />
            <Text
              style={styles.border}>
              ───────────  or register with  ───────────
            </Text>
            <View style={styles.socialContainer}>
              <SocialLogin iconName={'google'} title={'Google'} />
              <SocialLogin iconName={'facebook'} title={'Facebook'} />
              <SocialLogin iconName={'github'} title={'Github'} />
            </View>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.navText}>
              Already have an account ?
            </Text>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1
  },
  inputContainer: {
    paddingTop: 50,
    paddingHorizontal: 20
  },
  strongText: {
    color: Colors.primaryText,
    fontSize: 40,
    fontWeight: 'bold'
  },
  lightText: {
    color: Colors.gray,
    fontSize: 18,
    marginVertical: 10
  },
  border: {
    color: Colors.gray,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },
  socialContainer: {
    justifyContent: 'center',
    gap: 40,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  navText: {
    color: Colors.primaryText,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
  }
});

export default Signup;