import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [Sheraz, SetSheraz] = useState(false)
  const handleLogin = () => {
    // Handle login logic here
    if (!email || !password) {
      Alert.alert("PPSC", "Please Fill All the Fields")
      return;
    }
    console.log(email, password);
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: `https://ask-me-ppsc1-f6c12951af40.herokuapp.com//User/Login?email=${email}&password=${password}`,
    //   headers: { }
    // };

    // axios.request(config)
    // .then((response) => {
    //   console.log(JSON.stringify(response.data));
    //   if(response.data.status){
    //     navigation.navigate("Dashboard")

    //   }else{

    //     Alert.alert("Error","Something went wrong")
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    //   Alert.alert("Error","Something went wrong")

    // });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://ask-me-ppsc1-f6c12951af40.herokuapp.com/User/Login?email=${email}&password=${password}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          navigation.navigate("Dashboard")

        } else {

          Alert.alert("Error", "Something went wrong")
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Something went wrong")

      });


  };

  const handleGoogleSignIn = async () => {
    try {
      //   await GoogleSignin.hasPlayServices();
      //   const userInfo = await GoogleSignin.signIn();
      // Handle Google sign-in logic here
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={{ width: "100%", alignItems: "flex-end" }}>

        <TouchableOpacity
          onPress={() => navigation.navigate("Forget")}
        >
          <Text style={{}}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ top: 10, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>

        <TouchableOpacity style={[styles.button]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,]} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {/* <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={handleGoogleSignIn}
      /> */}
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    marginTop: 10,

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
