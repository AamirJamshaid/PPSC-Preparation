import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const NewPasswordScreen = ({ route }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let navigation=useNavigation();
  const handleResetPassword = () => {
    // Implement your logic to update the user's password (not implemented in this example)
    // For demonstration purposes, we'll just log the new password to the console
    // console.log('New Password:', newPassword);
    if(newPassword!=confirmPassword){
      alert("Password not matched")
      return;
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://ask-me-ppsc1-f6c12951af40.herokuapp.com/User/new_password?email=${email}&password=${newPassword}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if(response.data.status){

        Alert.alert('Password Updated', 'Your password has been updated successfully.');
        navigation.navigate("First")
      }

    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
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

export default NewPasswordScreen;
