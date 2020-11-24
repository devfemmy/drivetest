/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RNPaystack from 'react-native-paystack';
 
RNPaystack.init({ publicKey: 'pk_test_cda7d1bf15f84d4457f1b4d4475a73cdffaa5aec' });

AppRegistry.registerComponent(appName, () => App);
