import React, { Component, useState, useContext } from 'react';
import { View, StyleSheet,Text,Alert, TouchableOpacity, ActivityIndicator,
    Image, TextInput, ScrollView } from 'react-native';
import axios from '../../axios';
import CustomInput from '../../Components/CustomInput';
import AppButtons from '../../Components/AppButtons';

const ConfirmToken = (props) => {
  const [password, setPassword] = useState('');

  const {token, email} = props.route.params;
  const [button, setButton] = useState(false);


const resetPassword = () => {
    if (password === '') {
      alert("Please Enter Your New Password")
  } else {
     setButton(true)
      const data = {
          token: token,
          email: email,
          password: password
      }
      axios.post('reset/password', data)
      .then( res => {
        setButton(false)
          console.log('password', res.data)
        const response = res.data.message;
        const reset_token = res.data.data.reset_token;
        const email = res.data.data.email
        Alert.alert(
          'Alert',
          response,
          [
            {text: 'OK', onPress: () =>  props.navigation.navigate('Login')},
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
          const code = err.response.status;
          if (code === 400) {
            alert('Network Error, Please Try Again')
          }
          if (code === 401) {
              Alert.alert(
                  'Error!',
                  'Expired Token',
                  [
                    {text: 'OK', onPress: () => signOut()},
                  ],
                  { cancelable: false }
                )
            
          } else {
            //   setBtn(false)
              Alert.alert(
                  'Network Error',
                  'Please Try Again',
                  [
                    {text: 'OK', onPress: () =>  setButton(false)},
                  ],
                  { cancelable: false }
                )
          }
      })
     


  }
  }

  return (
    <ScrollView style= {styles.container}>
                {/* <View style= {styles.backContainer}>
                    <TouchableOpacity onPress= {() => props.navigation.goBack()}>
                        <Image 
                        style= {{width: 50, height: 50}}
                        source= {require('../assets/sliders/images/back.png')} />
                    </TouchableOpacity>

                </View> */}
                  <View style= {styles.inputContainer}>
                    <View style= {styles.formContainer}>
                        <Text style= {styles.forgotText}>Enter New Password?</Text>
                    </View>
                    <View style= {styles.textContainer}>
                    <Text style= {styles.label}>Enter your new Password</Text>
                    <CustomInput

                    placeholder= "Enter New Password" 
                    color= "white"
                    selectionColor= "white"
                    placeholderTextColor= "#9B9B9B"
                    secureTextEntry = {true}
                    value={password}
                    onChangeText={setPassword}
                    />
                     {button ? <ActivityIndicator  size="large" color="#FBB03B" /> :
                   <AppButtons onPress= {resetPassword} bg= "#FBB03B" textColor= "white" text= "Reset Password" />}
                    </View>               
               
                </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 50
  },
  backContainer: {
    marginVertical: 30
  },
  lowerText: {
    marginVertical: 35
  },
  forgotText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
  },
  passText: {
    color: 'white',
    fontWeight: 'bold'
  },
  formContainer:{
    marginVertical: 50
  },
  label: {
    color: 'black',
    opacity: 0.5,
    marginVertical: 10,
    fontSize: 13
  },
  textContainer: {
    marginVertical: 30,
  },
  touachableButton: {
    position: 'absolute',
    right: 3,
    height: 20,
    width: 35,
    padding: 2
  },
  imageStyle: {
    width: 30,
    height: 30
  },
  passwordInput: {
    fontSize: 22,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5,
  },
  textboxContainer: {
    marginTop: 5,
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#F7F7FA',
    color: 'white',
    flex: 1,
    paddingHorizontal: 30,
  },
  lowerContainer: {
    marginVertical: 10
  },
  logoImg: {
    width: 270,
    height: 100,
    resizeMode: 'contain'
  }
})
export default ConfirmToken