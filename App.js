import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/Login';
import SignUpScreen from './Screens/Signup';
import ForgotPasswordScreen from './Screens/Forget';
import Subjects from './Screens/Subjects';
import HomeScreen from './Screens/Selected';
import MCQScreen from './Screens/Mcq';
import Syllabus from './Screens/Syllabus';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home"   >
        <Stack.Screen name="Home" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Forget" component={ForgotPasswordScreen} />
        <Stack.Screen name="Dashboard" component={Syllabus} />
        <Stack.Screen name="Subjects" component={Subjects} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MCQScreen" component={MCQScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
