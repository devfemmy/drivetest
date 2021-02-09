import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View,Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';
import Logo from '../../assets/images/dtlogo.svg';
import axios from './../../axios';
import { AuthContext } from '../../Navigations/TabNav';

const Login = (props) => {
    const [email, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {signIn} = React.useContext(AuthContext);

    const logInUser = () => {
        setLoading(true);
        const data = {
            email: email,
            password: password
        }
        console.log(data, "Data to be sent")
        axios.post(`login`, data)
        .then(
            res => {
                setLoading(false)
                console.log("response", res);
                const token = res.data.data.token;
                const name = res.data.data.name;
                const last_name = res.data.data.last_name;
                const message = res.data.message
                AsyncStorage.setItem('name', name);
                AsyncStorage.setItem('token', `Bearer ${token}`);
                AsyncStorage.setItem('lastname', last_name);
                AsyncStorage.setItem('email', email);
                // Alert.alert(
                //     "Success",
                //     message,
                //     [
                //         {text: 'OK', onPress: },
                //       ],
                //       { cancelable: false }
                //   )
                  signIn({token:token});
                  props.navigation.navigate('Training')

            }
        )
        .catch(err => {
            // setLoading(false)
            
            setLoading(false)
            console.log(err, "errors") 
        })
    }
    if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FDB813" />
          </View>
        );
      }
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.upperContainer}>
                <Logo width= {200} height= {150} />
            </View>
            <View style= {styles.lowerContainer}>
                    <Text style= {styles.textStyle}>Login to your drive test account</Text>
                    <CustomInput labelText= "Email Address"
                    secureTextEntry = {false}
                    value={email}
                    onChangeText={setName}                       
                    />
                    <CustomInput labelText= "Password" 
                    secureTextEntry
                    value= {password}
                    onChangeText= {setPassword}
                    />
                    <AppButtons onPress= {logInUser} bg= "#FBB03B" textColor= "white" text= "Login" />
                    <Text onPress= {() => props.navigation.navigate('ForgotPassword')} style= {styles.textStyle2}>Forgot Password?</Text>
                    <Text style= {{color: 'white', marginTop: 15, textAlign: 'center', opacity: 0.5}} >Dont have an account?</Text>
                    <Text onPress= {() => props.navigation.navigate('CreateAccount')} style= {{...styles.textStyle2}}>Create account here</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2579',

    },
    upperContainer: {
        backgroundColor: '#fff',
        // height: Dimensions.get('window').height/3.5,
        padding: 25,
        alignItems: 'center'
       
    },
    lowerContainer: {
        // backgroundColor: '#2B2579',
        paddingHorizontal: 25,
        paddingVertical: 30

    },
    textStyle: {
        color: '#FFFFFF',
        opacity: 0.5,
        marginVertical: 15
    },
    textStyle2: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default Login