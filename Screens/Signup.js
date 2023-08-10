import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import url from '../url.json'
import { useNavigation} from '@react-navigation/native'
import axios from 'axios';
const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 let navigation=useNavigation();
  const handleSignUp = () => {
    // handle sign up logic here
    if(!email||!username||!password){
    Alert.alert("PPSC","Please Fill All the Fields")
    return;
    }
    let data = JSON.stringify({
      "email": email,
      "username": username,
      "password": password
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ask-me-ppsc1-f6c12951af40.herokuapp.com/User/Signup',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
      </View> */}
      <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>
     
      <View  style={{width:"100%",flexDirection:"row",alignItems:"center",alignContent:"center",justifyContent:"center",top:10}}>
    <Text>Already have an account? </Text>
      <TouchableOpacity
      onPress={()=>navigation.navigate("Home")}
      >
        <Text style={{color:"red",fontSize:15,fontWeight:"800"}}>Login</Text>
      </TouchableOpacity>
          </View>
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
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    // border:1i
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  signUpBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  signUpText: {
    color: 'white',
  },
  forgotPasswordText: {
    color: '#003f5c',
    marginTop: 20,
  },
  loginText: {
    color: '#003f5c',
    marginTop: 20,
  },
});

export default SignUpScreen;
