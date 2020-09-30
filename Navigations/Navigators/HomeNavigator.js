import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Screens/Login/Login';
import ForgotPassword from '../../Screens/Login/ForgotPassword';
import CreateAccount from '../../Screens/Login/Account/CreateAccount';

const Stack = createStackNavigator();

const LoginNavigator = (props) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        
      </Stack.Navigator>
    </>
  );
}



export default LoginNavigator;