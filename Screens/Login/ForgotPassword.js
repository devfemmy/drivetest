import React, { useState } from 'react';
import { Dimensions,ActivityIndicator, StyleSheet, Text,Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';
import axios from '../../axios';

const ForgotPassword = (props) => {
    const [email, setUsername] = useState('');
    const [button, setButton] = useState(false);
  
    const resetPassword = () => {
      if (email === '') {
        alert("Please fill in your correct credentials")
    } else {
       setButton(true)
        const data = {
            email: email
        }
        axios.post('forgot_password', data)
        .then( res => {
          setButton(false)
            console.log('password', res.data)
          const response = res.data.message;
          Alert.alert(
            'Alert',
            response,
            [
              {text: 'OK', onPress: () =>  props.navigation.navigate('ResetToken', {email: email})},
            ],
            { cancelable: false }
          )
          // if (response.status === 1) {
  
          // }else {
          //   setButton(false)
       
          //   alert('incorrect email')
          // }
          
        }).catch(err => {
            setButton(false)
            console.log("error", err.response)
            const code = err.response.status;
            if (code === 400) {
              alert('Incorrect Email')
            }
            if (code === 401) {
                Alert.alert(
                    'Error!',
                    'Expired Token',
                    [
                      {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: false }
                  )
              
            } else {
                setBtn(false)
                Alert.alert(
                    'Network Error',
                    'Please Try Again',
                    [
                      {text: 'OK', onPress: () =>  null},
                    ],
                    { cancelable: false }
                  )
            }
        })
       
  
  
    }
    }
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.upperContainer}>
                <Text style= {styles.textStyle}>
                Forgot Password
                </Text>
                <Text style= {styles.textStyle2}>Enter your registered email to reset password</Text>

            </View>
            <View style= {styles.lowerContainer}>
                    <CustomInput 
                    value={email}
                    onChangeText={setUsername}
                    labelText= "Email Address" />
                    {button ? <ActivityIndicator  size="large" color="#FBB03B" /> :
                   <AppButtons onPress= {resetPassword} bg= "#FBB03B" textColor= "white" text= "Reset Password" />}
                   
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        padding: 25
    },
    upperContainer: {
        paddingVertical: 25
    },
    lowerContainer: {
        marginVertical: 50
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#2B2579",
        marginVertical: 15
    },
    textStyle2: {
        color: '#000000'
    }
})

export default ForgotPassword