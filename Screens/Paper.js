import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Url from '../url.json'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
const Paper = () => {
    let Route = useRoute()
    const [Data, SetData] = useState([])
    const [notificationPermission, setNotificationPermission] = useState(false);
    const { name } = Route.params;
    const [loader, setloader] = useState(true)
    const [Selectindex, setindex] = useState();
    const [SelectedLoader, SetSelectedLoader] = useState(false);
    // console.log(name);
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
    useEffect(() => {
        registerForPushNotifications();
        GetData();
    }, []);
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
    function GetData() {
        const options = {
            method: 'GET',
            url: `${Url.Base_url}/Admin/past_paper`,
            params: { Category_Name: name }
        };

        axios.request(options).then(function (response) {
            // console.log(response.data);
            SetData(response.data)
            setloader(false)
        }).catch(function (error) {
            console.error(error);
        });
    }
    return (
        <View style={{ flex: 1 }}>
            {loader ?
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator />
                </View>

                :Data.length<=0?
                
                <View style={{ flex: 1, justifyContent: "center",alignItems:"center" }}>
                   <Text>Data is Empty</Text>
                </View>
                : <FlatList
                    data={Data}
                    renderItem={({ item, index }) => (
                        <View style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 5,
                            height: 40,
                            width: '90%',
                            alignSelf: "center",
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"

                        }} >
                            <Text>{item.Paper_Name}</Text>
                            <Text>{item.Paper_year}</Text>

                            {Selectindex == index && SelectedLoader ?
                                <ActivityIndicator /> :



                                <TouchableOpacity

                                    onPress={() =>
                                        downloadFile(item.Paper_Pdf, index)}
                                >

                                    <AntDesign name="clouddownload" size={24} color="black" />

                                </TouchableOpacity>}
                        </View>
                    )}

                />}
        </View>
    )
}

export default Paper