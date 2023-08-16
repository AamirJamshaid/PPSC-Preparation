import { View, Text, ActivityIndicator, FlatList, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Url from '../url.json'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
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

    // const downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/ppsc-db25f.appspot.com/o/files%2FAI%20CS%202019.pdf%20%20%20%20%20%20%202023-8-12%2011%3A14%3A30?alt=media&token=e0c3867d-a152-42c5-b320-2f4ef761d745';
    // const fileUri = FileSystem.cacheDirectory + 'AI_CS_2019.pdf';
    
    async function downloadAndSaveFile(downloadUrl) {
    console.log(downloadUrl);
      Linking.openURL(downloadUrl.Paper_Pdf)
      // try {
      //   const { status } = await MediaLibrary.requestPermissionsAsync();
    
      //   if (status === 'granted') {
      //     const downloadedFile = await FileSystem.downloadAsync(downloadUrl, fileUri);
    
      //     if (downloadedFile && downloadedFile.uri) {
      //       const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
    
      //       if (asset) {
      //         await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
      //         console.log('PDF file successfully saved');
      //       } else {
      //         console.log('Could not create asset');
      //       }
      //     } else {
      //       console.log('Downloaded file URI not available');
      //     }
      //   }
      // } catch (error) {
      //   console.log('Error while saving PDF:', error);
      // }
    }
    
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
                                      downloadAndSaveFile(item, index)}
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