import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios';
import url from '../url.json'
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
  let navigation = useNavigation()
  let Route = useRoute();
  const { Category } = Route.params;
  const [selectedOption, setSelectedOption] = useState('Preparation');
  const [Data, SetData] = useState([])
  const [loader, setloader] = useState(true);
  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (option == "Preparation") {

      navigation.navigate("MCQScreen", {
        Data: Data
      })
    } else {
      navigation.navigate("Test", {
        Data: Data
      })
    }
  }
  useEffect(() => {
    GetData();
  }, [])
  const GetData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${url.Base_url}/Admin/Find_Question?Category_Name=${Category}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        SetData(response.data.data)
        setloader(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      {loader ?
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View> :
        <>
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
        </>
      }
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
    width: "50%",
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems: "center", justifyContent: "center"
  },
  selectedOptionButton: {
    backgroundColor: '#00401A',
    borderColor: '#00401A',
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
