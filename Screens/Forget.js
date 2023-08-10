import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import url from '../url.json'
import axios from 'axios';
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://ask-me-ppsc1-f6c12951af40.herokuapp.com/User/reset_email?email=${email}`,
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{uri:url.image}} />
      <Text style={styles.titleText}>Forgot Password?</Text>
      <Text style={styles.subtitleText}>Please enter your email address to reset your password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity style={styles.resetBtn} onPress={handleResetPassword}>
        <Text style={styles.resetText}>RESET PASSWORD</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    borderRadius:100
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  resetBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  resetText: {
    color: 'white',
  },
  loginText: {
    color: '#003f5c',
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;
