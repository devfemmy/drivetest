import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Dimensions,ActivityIndicator, StyleSheet, Text,Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppButtons from '../Components/AppButtons';
// import CustomInput from '../../Components/CustomInput';
import axios from '../axios';
import CustomInput from '../Components/CustomInput';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cpassword, setConfirmPassword] = useState('');
    const [button, setButton] = useState(false);
  
    const resetPassword = () => {
        if (oldPassword === '' || cpassword === '' || newPassword === '') {
            alert('Password fields cannot be empty')
        }else {
            if (cpassword !== newPassword) {
                alert("Password does not match")
            }else {
                setButton(true)
                const id = AsyncStorage.getItem('token').then(
                    res => {
                        const data = {
                            old_password: oldPassword,
                            new_password: newPassword,
                            c_password: cpassword
                            
                        }
                        axios.post('change/password', data, {headers:{Authorization:res}})
                        .then(
                            res => {  
                                console.log(res, "CHANGE")
                                const message = res.data.message;
                                alert(message)
                                setButton(false)
                            }
                        )
                        .catch(err => {
                            console.log(err.response)
                            setButton(false)
                            const code = err.response.status;
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
                                // setLoader(true)
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
                )
                .catch( err => {console.log(err)})
            }
        }
    }
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.upperContainer}>
                <Text style= {styles.textStyle}>
                Change Password
                </Text>
                <Text style= {styles.textStyle2}>You can change your password here</Text>

            </View>
            <View style= {styles.lowerContainer}>
                    <CustomInput 
                    value={oldPassword}
                    secureTextEntry
                    onChangeText={setOldPassword}
                    labelText= "Old Password" />
                    <CustomInput 
                    value={newPassword}
                    secureTextEntry
                    onChangeText={setNewPassword}
                    labelText= "New Password" />
                    <CustomInput 
                    value={cpassword}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                    labelText= "Confirm Password" />
                    {button ? <ActivityIndicator  size="large" color="#FBB03B" /> :
                   <AppButtons onPress= {resetPassword} bg= "#FBB03B" textColor= "white" text= "Change Password" />}
                   
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

export default ChangePassword