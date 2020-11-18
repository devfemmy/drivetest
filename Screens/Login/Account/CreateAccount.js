import React, { useContext, useState } from 'react';
import { Dimensions,ActivityIndicator, StyleSheet,Alert, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import AppButtons from '../../../Components/AppButtons';
import CustomInput from '../../../Components/CustomInput';
import axios from '../../../axios';
// import { AuthContext } from '../../../Navigations/TabNav';
// import {AuthContext} from '../../../Navigations/TabNav.js';


const CreateAccount = (props) => {
    // const {signOut} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
  

    const createUser = () => {
        if (name === '' || phone === '' || lastname === '' || email === '' || password === '') {
            alert('Please fill details correctly')
        } else if (password != cpassword) {
            alert('Your password do not match')
        }else {
            setLoading(true);
            const data = {
                name: name,
                last_name: lastname,
                email: email,
                phone: phone,
                password: password,
                c_password: cpassword
            }
            console.log(data, "Data to be sent")
            axios.post(`register`, data)
            .then(
                res => {
                    setLoading(false)
                    console.log("response", res);
                    const token = res.data.data.token;
                    const name = res.data.data.name;
                    // const last_name = res.data.data.last_name;
                    const message = res.data.message
                    AsyncStorage.setItem('name', name);
                    AsyncStorage.setItem('token', token);
                    // AsyncStorage.setItem('lastname', last_name);
                    Alert.alert(
                        "Success",
                        message,
                        [
                            {text: 'OK', onPress: () => props.navigation.goBack()},
                          ],
                          { cancelable: false }
                      )
                    //   signIn({token:token});
    
                }
            )
            .catch(err => {
                // setLoading(false)
                
                setLoading(false)
                console.log(err.response, "errors") 
                const errorMsg = err.response.data.message;
                Alert.alert(
                    "Error",
                    errorMsg,
                    [
                        {text: 'OK'},
                      ],
                      { cancelable: false }
                  )
            })
        }
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
                <Text style= {styles.textStyle}>
                Create Account
                </Text>
                <View> 
                <CustomInput 
                width= "100%" labelText= "First Name"
                value={name}
                onChangeText={setName}  
                />
                <CustomInput
                 value={lastname}
                 onChangeText={setLastName}                 
                width= "100%" 
                labelText= "Last name" />
                </View>
                <View>
                <CustomInput
                value={phone}
                onChangeText={setPhone}  
                keyboardType= "phone-pad" width= "100%" 
                labelText= "Phone Number" />
                <CustomInput
                value={email}
                onChangeText={setEmail}  
                keyboardType= "email-address" width= "100%" labelText= "Email Address" />
                <CustomInput
                value={password}
                onChangeText={setPassword}  
                secureTextEntry width= "100%" labelText= "Password" />
                <CustomInput 
                value={cpassword}
                onChangeText={setCPassword} 
                secureTextEntry width= "100%" labelText= "Confirm Password" />
                </View>
            </View>
            <View style= {styles.lowerContainer}>
                    <AppButtons onPress= {createUser} bg= "#FBB03B" textColor= "white" text= "Create Account" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // minHeight: Dimensions.get('window').height,
        padding: 25
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    upperContainer: {
        paddingVertical: 10
    },
    lowerContainer: {
        marginVertical: 10
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#2B2579",
        marginVertical: 20
    },
    textStyle2: {
        color: '#000000'
    }
})

export default CreateAccount