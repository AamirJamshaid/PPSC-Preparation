import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'

const OptionButton = ({ title, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.optionButton, selected && styles.selectedOptionButton]}
    onPress={onPress}
  >
    <Text style={[styles.optionTitle, selected && styles.selectedOptionTitle]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const HomeScreen = (props) => {
    let navigation=useNavigation()
  const [selectedOption, setSelectedOption] = useState('Preparation');

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    navigation.navigate("MCQScreen")
  };

  return (
    <View style={styles.container}>
      <OptionButton
        title="Preparation"
        selected={selectedOption === 'Preparation'}
        onPress={() => handleOptionPress('Preparation')}
      />
      <OptionButton
        title="Test"
        selected={selectedOption === 'Test'}
        onPress={() => handleOptionPress('Test')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  optionButton: {
    width:"50%",
    height:40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems:"center",justifyContent:"center"
  },
  selectedOptionButton: {
    backgroundColor: '#00cc00',
    borderColor: '#00cc00',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  selectedOptionTitle: {
    color: '#fff',
  },
});

export default HomeScreen;
