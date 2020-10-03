import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Screens/Login/Login';


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