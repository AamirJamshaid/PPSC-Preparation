import * as React from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/Login';
import SignUpScreen from './Screens/Signup';
import ForgotPasswordScreen from './Screens/Forget';
import Subjects from './Screens/Subjects';
import HomeScreen from './Screens/Selected';
import MCQScreen from './Screens/Mcq';
import Syllabus from './Screens/Syllabus';
import Test from './Screens/Test';
import ResultScreen from './Screens/ResultScreen';
import Paper_Subjects from './Screens/PaperCategory';
import Paper from './Screens/Paper';
import Books from './Screens/Books';
import MockTest from './Screens/MockTest';
import SubscriptionScreen from './Screens/Subscription';
import First from './Screens/First';
import Second from './Second';
import Third from './Screens/Third';
import ForgetPasswordScreen from './Screens/Forget1';
import OtpScreen from './Otpscreen';
import NewPasswordScreen from './NewPassword';
// import NewPasswordScreen from './NewPassword';



const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="First"   >
        <Stack.Screen name="First" component={First} options={{ headerShown: false }} />
        {/* <Stack.Screen name="First" component={second}  options={{headerShown:false}} /> */}
        {/* <Stack.Screen name="Signup" component={SignUpScreen} /> */}
        {/* <Stack.Screen name="First" component={second}  options={{headerShown:false}} /> */}

        <Stack.Screen name="Home" component={Second} options={{ headerShown: false }} />

        <Stack.Screen name="register" component={Third}  options={{headerShown:false}} />
        <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="Dashboard" component={Syllabus} />
        <Stack.Screen name="Subjects" component={Subjects} />
        <Stack.Screen name="PaperSubjects" component={Paper_Subjects} />
        <Stack.Screen name="Paper" component={Paper} />
        <Stack.Screen name="Books" component={Books} />
        <Stack.Screen name="Mock" component={MockTest} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MCQScreen" component={MCQScreen} />
        <Stack.Screen name="Subscribe" component={SubscriptionScreen} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
