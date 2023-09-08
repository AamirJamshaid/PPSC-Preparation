import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { a } from '../assests/icon';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
// import { a } from '../'
const Third = () => {
    let navigation=useNavigation();
    const [First, SetFirstName] = useState('');
    const [LastName, SetLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Loader,setLoader]=useState(false)
    
    const handleSignUp = () => {

        const emailPattern = /^[a-z][a-z0-9._-]*@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (!emailPattern.test(email)) {
          Alert.alert('Please enter a valid email address starting with a lowercase letter.');
          return;
        }

        if (!email.endsWith('@gmail.com')) {
            Alert.alert('Please enter a valid email address.');
            return;
          }
          if (password.length > 8) {
            Alert.alert('Password must be at least 8 characters long.');
            return;
          }
        //   const passwordPattern = /^[0-9]{1,7}$/;
        //   if (!passwordPattern.test(password)) {
        //     Alert.alert('Password must be less than 8 characters and contain only numbers.');
        //     return;
        //   }
        // const passwordPattern = /^[a-zA-Z]{1,7}$/;
        //   if (!passwordPattern.test(password)) {
        //     Alert.alert('Password must be less than 8 characters and contain only latters.');
        //     return;
        //   }
        // if (/^[a-zA-Z]+$/.test(password) || /^[0-9]+$/.test(password)) {
        //     Alert.alert('Password must not consist of only letters or only numbers.');
        //     return;
        //   }
        
      
      
        // handle sign up logic here
        setLoader(true)
        if(!email||!First||!LastName||!password){
        Alert.alert("PPSC","Please Fill All the Fields")
        return;
        }
        let data = JSON.stringify({
          "email": email,
          "username": First+LastName,
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
        setLoader(false)
          
        //   Alert.alert(response.data)
         navigation.goBack();
        })
        .catch((error) => {
            console.log(error);
          Alert.alert('Error',"Something went wrong");
        setLoader(false)

        });
        // setTimeout(() => {
        //     setLoader(false)
        // }, 3000);
      }
    
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 60 }} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={a.signup} />
                </View>
                <View>
                    <Text style={{ marginLeft: 15, fontWeight: 'bold', fontSize: 26, color: '#000000' }}>
                        signup
                    </Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 15,
                            padding: 10,
                        }}
                        placeholder='First Name'
                        onChangeText={(val)=>SetFirstName(val)}

                    />
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 15,
                            padding: 10,
                        }}
                        placeholder='Last Name'
                        onChangeText={(val)=>SetLastName(val)}

                    />
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 15,
                            padding: 10,
                        }}
                        placeholder='Email'
                        onChangeText={(val)=>setEmail(val)}
                    />
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 15,
                            padding: 10,
                        }}
                        placeholder='Password'
                        onChangeText={(val)=>setPassword(val)}

                    />
                </View>
                <TouchableOpacity
                onPress={()=>handleSignUp()}
                    style={{
                        height: '5%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 15,
                        backgroundColor: '#00401A',
                        borderRadius: 10,
                    }}
                >
                    <Text style={{ color: '#FFF' }}>Sign up</Text>

                </TouchableOpacity>
                <View style={{ height: 60, width: "90%", alignSelf: "center", alignItems: "center",flexDirection:"row",justifyContent:"center",paddingBottom:40 }}>
                    <Text style={{ fontWeight: '900', color: '#000000' }}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity  onPress={()=>{
                        navigation.navigate("Home")
                    }}>
                        <Text style={{ color: '#00401A' }}>Login</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>


            <Modal  visible={Loader}  transparent>

                <View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator size={"large"} color={"#000"} />
                </View>
            </Modal>
        </View>
    );
};

export default Third;
