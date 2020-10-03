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
// import Playquiz from '../Screens/Practise/MainQuestion';

const Stack = createStackNavigator()

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen headerShown= {false} name="Welcome" options= {{title: 'Drive Test', headerTransparent: true, headerTitleStyle: {color: 'white'}}} component={WelcomeScreen} />
            <Stack.Screen options= {
                
                {headerLeft: () => (
        <View style= {{marginLeft: 10}}>
              <Logo width={120} height= {150} />
        </View>
             ),
             title: ''
             
             }} name="Drive Test" component={TabNav} />
            <Stack.Screen name="ForgotPassword" options= {{title: 'Forgot Password'}} component={ForgotPassword} />
            <Stack.Screen name="CreateAccount"  options= {{title: 'Create Account'}} component={CreateAccount} />
            <Stack.Screen name="Quiz"  options= {{title: 'Practise Question'}} component={Playquiz} />
            <Stack.Screen name="Question"  options= {{title: 'Practise Questions'}} component={Questions} />
            <Stack.Screen name="Slots"  options= {{title: 'Select Time Slot'}} component={Slot} />
            <Stack.Screen name="Details"  options= {{title: 'Exam Details'}} component={Details} />
            <Stack.Screen name="MarathonQuestion"  options= {{title: 'Maranthon Questions'}} component={MaranthonQuestions} />
        </Stack.Navigator>
        </NavigationContainer>

    )
}

export default StackNav;