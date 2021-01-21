import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, Alert } from 'react-native';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';
import axios from '../../axios';
import RNPaystack from 'react-native-paystack';


const Details = (props) => {
    const {time,payment_id, date, address, name, price, time_id, slot_id} = props.route.params;
    const [showBtn, setShowBtn] = useState(true)
    console.log(payment_id);

    const chargeCard = () =>  {
        setShowBtn(false)
        RNPaystack.chargeCard({
          cardNumber: '4084084084084081', 
          expiryMonth: '11', 
          expiryYear: '21', 
          cvc: '408',
          email: 'chargeIOS@master.dev',
          amountInKobo: 150000,
        //   subAccount: 'ACCT_pz61jjjsslnx1d9',
        })
        .then(response => {
           
          console.log(response, "paystack"); // card charged successfully, get reference here
          setShowBtn(true)
        })
        .catch(error => {
      
          console.log(error, "error pay"); // error is a javascript Error object
          console.log(error.message);
          console.log(error.code);
          setShowBtn(true)
        })
        
    }

    const confirmAppointment = () => {
        setShowBtn(false)
        const token = AsyncStorage.getItem('token').then(
            res => {
                const data = {
                    id: time_id,
                    slot_id: slot_id, 
                }
                console.log("data to send", data)
                axios.post('book/slot', data, {headers: {Authorization: res}})
                .then(
                    res => {  
                       console.log(res, "success")
                        const message = res.data.message; 
                        Alert.alert(
                            message,
                            'Appointment Confirmed Successfully',
                            [
                              {text: 'OK', onPress: () => props.navigation.navigate('Exam')},
                            ],
                            { cancelable: false }
                          )
                    //    toggleOverlay()
                        setShowBtn(true)
                    }
                )
                .catch(err => {
                    setShowBtn(true)
                    console.log(err.response)
                    const code = err.response.status;
                    const message = err.response.data.message
                    if (code === 400) {
                        setShowBtn(true)
                        Alert.alert(
                            message,
                            'Please Try Another',
                            [
                              {text: 'OK', onPress: () => props.navigation.navigate('Exam')},
                            ],
                            { cancelable: false }
                          )
                    }
                    else if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => null},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                        console.log(err)
                        setShowBtn(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
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
    return (
        <View style= {styles.container}>
            <ScrollView>
                <View style= {styles.firstContainer}>
                    <View>
                            <View style= {styles.flexContainer}>
                                    <ExamIcon width= {40} height= {40} />
                                    <View style= {{width: '83%'}}> 
                                        <Text style= {styles.textStyle3}>
                                            {name}
                                        </Text>
                                        <Text style= {styles.textStyle4}>
                                            {address}
                                        </Text>
                                    </View>
                                </View>
                    </View>
                    </View>
                    <View style= {styles.secondContainer}>
                    <Text style= {styles.textStyle4}>Date and Time</Text>
                    <Text style= {styles.textStyle3}>
                        {`${date} ${time}`}
                    </Text>
                    </View>
                    <View style= {styles.secondContainer}>
                    <Text style= {styles.textStyle4}>Price</Text>
                    <Text style= {styles.textStyle3}>
                        {`₦${price}`}
                    </Text>
                    </View>
                    <View style= {styles.thirdContainer}>
                        <Text style= {{fontWeight: 'bold', fontSize: 15, textAlign: 'center', marginBottom: 20}}>Please Provide your information below</Text>
                        <CustomInput labelText= "Full name" />
                        <CustomInput labelText= "Mobile" />
                        <CustomInput labelText= "Email" />
                    </View>
            </ScrollView>
            <View style= {styles.footer}>
            {showBtn ?  <AppButtons onPress= {confirmAppointment} bg= "#2B2579" textColor= "white" text= "Confirm and Make Payment" />: <ActivityIndicator size= "large" color= "#000075"/>}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    firstContainer: {
        padding: 25
    },
    secondContainer: {
        minHeight: 40,
        borderColor: '#E6EAF0',
        borderTopWidth: 1,
        padding: 25
    },
    thirdContainer: {
        backgroundColor: '#F2F7FF',
        minHeight: 200,
        padding: 20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    textStyle2: {
        color: 'white',
        marginVertical: 8
    },
    textStyle3: {
        fontWeight: 'bold',
        fontSize: 17
    },
    textStyle4: {
        color: '#BBC2CC',
        marginVertical: 5
    },
    lowerContainer: {
        margin: 25,
        paddingVertical: 20
    },
    footer: {
        minHeight: 120,
        backgroundColor: 'white',
        padding: 25
    }
});

export default Details