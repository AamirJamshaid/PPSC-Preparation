import React, { useState } from 'react';
import { View, Text, Image, Alert,TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { a } from './assests/icon';
import axios from 'axios';
const Second = ({ navigation }) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader,setloader]=useState(false)
    const handleLogin = () => {
        if (!email || !password) {
          Alert.alert("PPSC", "Please Fill All the Fields")
          return;
        }
        setloader(true)
        console.log(email, password);
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
    setloader(false)

          })
          .catch((error) => {
            console.log(error);
            Alert.alert("Error", "Something went wrong")
    setloader(false)
          });
    
    
      };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={a.login} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(val)=>setEmail(val)} />
        <TextInput style={styles.input}  secureTextEntry={true} placeholder="Password"  onChangeText={(val)=>setPassword(val)} />
        <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
          <Text style={styles.forgotPasswordText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
         {
            loader?
         <ActivityIndicator  />   
         :   <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        }
       <View   style={{flexDirection:"row"}}>

        <Text style={styles.areYouNewText}>
          Are you new?
        </Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
       </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:22,
    flex: 1,
    // backgroundColor:"cyan"
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  formContainer: {
    flex: 0.8,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  forgotPasswordText: {
    fontWeight: '900',
    color: '#00401A',
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    // height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#00401A",
    borderRadius: 10,
    margin: 16,
  },
  loginButton: {
    width:'90%',
    height:44,
    alignItems:"center",
    justifyContent:"center",
    // backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor:"#00401A"
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  orText: {
    color: '#FFF',
    marginBottom: 8,
  },
  loginWithGoogleText: {
    color: '#000000',
    marginBottom: 8,
  },
  areYouNewText: {
    fontWeight: '300',
    color: '#000000',
    justifyContent:"center",
    // alignItems:
  },
  registerText: {
    color: '#00401A',
    fontWeight: '900',
  },
});

export default Second;
