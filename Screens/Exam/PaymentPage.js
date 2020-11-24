import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, Alert, Image } from 'react-native';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';
import axios from '../../axios';
import RNPaystack from 'react-native-paystack';
import PaymentInput from '../../Components/PaymentInput';


const PaymentPage = (props) => {
    // const {time, date, address, name, price, time_id, slot_id} = props.route.params;
    const [showBtn, setShowBtn] = useState(true);
    const [cardNo, setCardNo] = useState('4084084084084081');
    const [month, setMonth] = useState('09');
    const [year, setYear] = useState('22');
    const [CVV, setCvv] = useState('408');
    const [email, setEmail] = useState('justforcodesanddev@gmail.com')

    const chargeCard = () =>  {
        setShowBtn(false)
        console.log(cardNo, "cardNo")
        RNPaystack.chargeCard({
          cardNumber: cardNo, 
          expiryMonth: month, 
          expiryYear: year, 
          cvc: CVV,
          email: email,
          amountInKobo: 1500000,
        //   subAccount: 'ACCT_pz61jjjsslnx1d9',
        })
        .then(response => {
           
          console.log(response, "paystack"); // card charged successfully, get reference here
          setShowBtn(true);
          Alert.alert(
            'Alert',
            'Payment Received',
            [
              {text: 'OK', onPress: () => props.navigation.navigate('Exam')},
            ],
            { cancelable: false }
          )
          
        })
        .catch(error => {
      
          console.log(error, "error pay"); // error is a javascript Error object
          console.log(error.message);
          console.log(error.code);
          setShowBtn(true);
          Alert.alert(
            'Error',
            'Payment Not Received',
            [
              {text: 'OK', onPress: () => props.navigation.navigate('Exam')},
            ],
            { cancelable: false }
          )
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
            <PaymentInput
                width= "100%"
                onChangeText = {setCardNo}
                defaultValue = {"4084084084084081"}
                editable= {false}
                value= {"4084084084084081"}
                // placeholder = "4084084084084081" 
                keyboardType= "number-pad" labelText= "Card Number" />
                <View style= {styles.flexContainer}>
                <PaymentInput
                width= "45%"
                onChangeText = {setMonth}
                defaultValue = {"08"}
                editable= {false}
                value= {"08"}
                placeholder = "MM" 
                keyboardType= "number-pad" labelText= "Expiry Month" />
                <PaymentInput
                width= "45%"
                onChangeText = {setYear}
                defaultValue = {"22"}
                editable= {false}
                value= {"22"}
                placeholder = "YY" 
                keyboardType= "number-pad" labelText= "Expiry Year" />
                </View>
                <View>
                <PaymentInput
                width= "100%"
                onChangeText = {setCvv}
                defaultValue = {"408"}
                editable= {false}
                value= {"408"}
                placeholder = "CVV" 
                keyboardType= "number-pad" labelText= "CVV" />
                <PaymentInput
                width= "100%"
                onChangeText = {setEmail}
                defaultValue = {"justforcodesanddev@gmail.com"}
                editable= {false}
                value= {"justforcodesanddev@gmail.com"}
                placeholder = "Email Address" 
                keyboardType= "email-address" labelText= "Email Address" />
                </View>
                {showBtn ?  <AppButtons onPress= {chargeCard} bg= "#2B2579" textColor= "white" text= {`PAY 15,000 NGN`} />: <ActivityIndicator size= "large" color= "#000075"/>}
            <View style= {{alignItems: 'center'}}>
                <Image 
                style= {{width: 180, height: 80, resizeMode: 'contain'}}
                source= {require('../../assets/images/paystack.png')} />
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 25
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
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

export default PaymentPage