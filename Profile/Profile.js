import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Dimensions, StyleSheet,Alert, Text, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppButtons from '../Components/AppButtons';
import CustomInput from '../Components/CustomInput';
import axios from '../axios';



const Profile = (props) => {
    const [loading, setLoading] = useState(true);
    const [response, setResponses] = useState([]);
    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showBtn, setShowBtn] = useState(true);

    const getProfile = () => {
        const id = AsyncStorage.getItem('token').then(
            res => {
                axios.get(`profile`, {headers: {Authorization: res}})
                .then(
                  
                    res => {
                        setLoading(false)
                        console.log("profile", res.data.success)
                        const profile = res.data.success;
                        const name = profile.name;
                        const last_name = profile.last_name;
                        const email = profile.email;
                        const phone = profile.phone;
                        setName(name);
                        setLastName(last_name);
                        setEmail(email);
                        setPhone(phone)
                       
                    }
                )
                .catch(err => {
                    setLoading(false)
                    console.log(err.response)
                    const code = err.response.status;
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
                      setLoading(false)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => setShowBtn(true)},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                      console.log(err.response.status)
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    const  editProfile = () => {
        if (phone === '' || last_name === '' || name === '' ) {
          alert ('Fill details correctly')
        } else {
          setShowBtn(false)
          const id = AsyncStorage.getItem('token').then(
              res => {
                  const data = {
                      last_name:  last_name,
                      name: name,
                      phone: phone,
                  }
                  axios.post('profile/edit', data, {headers: {Authorization: res}})
                  .then(
                      res => {  
                         console.log(res)
                          const message = res.data.message; 
                          alert(message);
                          setShowBtn(true)
                      }
                  )
                  .catch(err => {
                    console.log('error', err.response)
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
                          setShowBtn(true)
                          Alert.alert(
                              'Validation Error',
                              'Please enter a valid Date',
                              [
                                {text: 'OK', onPress: () => setShowBtn(true)},
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

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getProfile()
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
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
                Profile
                </Text>

                <CustomInput
                value={name}
                onChangeText={setName}  
                width= "100%" labelText= "First Name" />
                <CustomInput
                value={last_name}
                onChangeText={setLastName} 
                width= "100%" labelText= "Last name" />
                <View>
                <CustomInput 
                value={phone}
                onChangeText={setPhone} 
                width= "100%" labelText= "Phone Number" />
                <CustomInput 
                 value={email}
                 onChangeText={setEmail} 
                width= "100%" labelText= "Email Address" />
                {/* <CustomInput width= "100%" labelText= "Date of Birth" />
                <CustomInput width= "100%" labelText= "Gender" /> */}
                </View>
            </View>
            <View style= {styles.lowerContainer}>
            {showBtn ? <AppButtons onPress= {editProfile} bg= "#FBB03B" textColor= "white" text= "Save Profile" />: <ActivityIndicator size= "large" color= "#000075"/>}
                   
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
        paddingVertical: 40
    },
    lowerContainer: {
        marginVertical: 10
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

export default Profile