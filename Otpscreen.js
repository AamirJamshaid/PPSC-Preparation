import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const OtpScreen = ({  navigation }) => {
  let route=useRoute();
  const { email,otp } = route.params;
  const [otp1, setOtp] = useState('');
   console.log(email,otp);
  // Function to verify the OTP
  const verifyOtp = () => {
    // For demonstration purposes, we'll hardcode the OTP as "123456"
    const correctOtp = "123456";
    if (otp1 === otp) {
      navigation.navigate('NewPassword', { email });
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>An OTP has been sent to your email.</Text>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        onChangeText={(text) => setOtp(text)}
        value={otp1}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.resetButton} onPress={verifyOtp}>
        <Text style={styles.resetButtonText}>Verify OTP</Text>
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

export default OtpScreen;
