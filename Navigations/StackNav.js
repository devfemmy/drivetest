import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateAccount from '../Screens/Login/Account/CreateAccount';
import ForgotPassword from '../Screens/Login/ForgotPassword';
import TabNav from './TabNav';
import Logo from '../assets/images/dtl.svg';
import { View } from 'react-native';

const Stack = createStackNavigator()

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen options= {{headerLeft: () => (
        <View style= {{marginLeft: 10}}>
              <Logo width={120} height= {150} />
        </View>
             ), }} name="Drive Test" component={TabNav} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
        </NavigationContainer>

    )
}

export default StackNav;