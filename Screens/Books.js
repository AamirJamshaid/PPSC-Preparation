import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator,Image, TouchableOpacity } from 'react-native';
import url from '../url.json'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
const Books = () => {
  const [loader,setloader]=useState(true);
  const [Selectindex, setindex] = useState();
  const [SelectedLoader, SetSelectedLoader] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const registerForPushNotifications = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus === 'granted') {
      setNotificationPermission(true);
    }
  };
  const [items, setItems] = useState([

  ]);
  const downloadFile = async (value, val) => {
    setindex(val)
    SetSelectedLoader(true)
    const fileUriLocal = FileSystem.documentDirectory + 'file.pdf';

    try {
        const downloadResumable = FileSystem.createDownloadResumable(
            value,
            fileUriLocal
        );

        const { uri } = await downloadResumable.downloadAsync();
        if (notificationPermission) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'File Download Complete',
                body: 'Your PDF file has been downloaded successfully!',
              },
              trigger: null, // Send immediately
            });
          }
          console.log(uri);
        alert('File downloaded to:', uri);
        SetSelectedLoader(false)
    } catch (error) {
        console.error('Error downloading file:', error);
        SetSelectedLoader(false)

    }
};
  const GetData=()=>{

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${url.Base_url}/Admin/get_books`,
      headers: { }
    };
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setItems(response.data)
      setloader(false)
    })
    .catch((error) => {
      console.log(error);
    });
    }

useEffect(()=>{
    registerForPushNotifications();
GetData();
},[])


  let navigation=useNavigation()


  const renderSubjectsItem = ({ item,index }) => {
    console.log("Data");
    return (
      <TouchableOpacity style={styles.SubjectsItem}
      onPress={()=>{
        // navigation.navigate("HomeScreen")
        downloadFile(item.Book_url,index)
      }}
      >
        <Image
          style={styles.SubjectsItemImage}
          source={{ uri: item.Book_Image }}
        />
        <View  style={{width:"100%",alignItems:"center",justifyContent:"center",}}>
        {Selectindex==index&&SelectedLoader?
<ActivityIndicator />:
<Text style={styles.SubjectsItemTitle}>{item.BookName}</Text>
        }
        

        </View>
      </TouchableOpacity>
    );
  };

 
  return loader?(
<View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  <ActivityIndicator  size={"large"} />
</View>

  ):(
    <View style={styles.container}>
      <FlatList
        data={items}
        numColumns={2}
        // keyExtractor={(item) => item._id.toString()}
        renderItem={renderSubjectsItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubjectsItem: {
    width:"43%",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  SubjectsItemImage: {
    width: "100%",
    height: 100,
    // borderRadius: 50,
    marginBottom: 5,
  },
  SubjectsItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Books;
