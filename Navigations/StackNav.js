import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateAccount from '../Screens/Login/Account/CreateAccount';
import ForgotPassword from '../Screens/Login/ForgotPassword';
import TabNav from './TabNav';
import Logo from '../assets/images/dtl.svg';
import { View } from 'react-native';
import Playquiz from '../Screens/Practise/MainQuestion';
import Questions from '../Screens/Practise/Questions';
// import Maranthon from '../Screens/Maranthon/Maranthon';
import MaranthonQuestions from '../Screens/Maranthon/MaranthonQuestion';
import Slot from '../Screens/Exam/Slot';
import Details from '../Screens/Exam/Details';
import WelcomeScreen from '../Screens/Login/Welcome';
import Profile from '../Profile/Profile';
import NextAppointment from '../Screens/Exam/NextExam';
import ChangePassword from '../Settings/ChangePassword';
import PractiseQuestions from '../Screens/Practise/PractiseQuestions';
import PaymentPage from '../Screens/Exam/PaymentPage';
import ResetToken from '../Screens/Login/ResetToken';
import ConfirmToken from '../Screens/Login/ConfirmToken';
// import Playquiz from '../Screens/Practise/MainQuestion';

const Stack = createStackNavigator()

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen headerShown= {false} name="Welcome" options= {{title: 'Drive Test', 
            headerTransparent: true, headerTitleStyle: {color: 'white'}}} 
            component={WelcomeScreen} />
            <Stack.Screen options= {
                
                {headerLeft: () => (
        <View style= {{marginLeft: 10}}>
              <Logo width={120} height= {150} />
        </View>
             ),
             title: ''
             
             }} name="Drive Test" component={TabNav} />
            <Stack.Screen name="ForgotPassword" options= {{title: 'Forgot Password'}} component={ForgotPassword} />
            <Stack.Screen name="ResetToken" options= {{title: 'Reset Token'}} component={ResetToken} />
            <Stack.Screen name="ConfirmToken" options= {{title: 'Confirm Token'}} component={ConfirmToken} />
            <Stack.Screen name="CreateAccount"  options= {{title: 'Create Account'}} component={CreateAccount} />
            <Stack.Screen name="Quiz"  options= {{title: 'Practise Question'}} component={Playquiz} />
            <Stack.Screen name="Question"  options= {{title: 'Practise Questions'}} component={PractiseQuestions} />
            <Stack.Screen name="Slots"  options= {{title: 'Select Time Slot'}} component={Slot} />
            <Stack.Screen name="Details"  options= {{title: 'Exam Details'}} component={Details} />
            <Stack.Screen name="Next"  options= {{title: 'Centers'}} component={NextAppointment} />
            <Stack.Screen name="Profile"  options= {{title: 'My Profile'}} component={Profile} />
            <Stack.Screen name="ChangePassword" options= {{title: 'Change Password'}} component={ChangePassword} />
            <Stack.Screen name="Payment" options= {{title: 'Payment'}} component={PaymentPage} />
            <Stack.Screen name="MarathonQuestion"  options= {{title: 'Maranthon Questions'}} component={MaranthonQuestions} />
        </Stack.Navigator>
        </NavigationContainer>

    )
}

export default StackNav;