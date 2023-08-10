import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRequestPasswordReset = () => {
    // Implement your logic here to send a password reset link to the provided email (not implemented in this example)
    // For demonstration purposes, we'll just log the email to the console
   
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://ask-me-ppsc1-f6c12951af40.herokuapp.com/User/reset_email?email=${email}`,
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  navigation.navigate('Otp', { email,otp:response.data.otp });

})
.catch((error) => {
  console.log(error);
});
    // After requesting a password reset, navigate to the OTP screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forget Password?</Text>
      <Text style={styles.subtitle}>Enter your email address to reset your password.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleRequestPasswordReset}>
        <Text style={styles.resetButtonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#00401A',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgetPasswordScreen;
