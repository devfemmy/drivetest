import React, {useState, useEffect} from 'react';
import { View, StyleSheet,ActivityIndicator,
    Alert,
    TouchableOpacity, ScrollView,Text, Button } from 'react-native';
import PaystackWebView from "react-native-paystack-webview";
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../../assets/images/dtl.svg';
import axios from '../../axios';
import CustomInput from '../../Components/CustomInput'

const PaymentPage = (props) => {
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const { payment_id} = props.route.params;
    const [paymentPlans, setPaymentPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const [amount, setAmount] = useState('');
    const [referenceNum, setReferenceNum] = useState('');


    const inititatePayment = () => {
        const id = AsyncStorage.getItem('token').then(
            res => {
                const data = {
                    id: parseInt(payment_id)
                }
                axios.post('payment/initiate', data, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        const payment_plans = res.data.data;
                        setPaymentPlans(payment_plans);  
                        const amount = payment_plans.amount_to_pay;
                        const trans_id = payment_plans.tran_id;
                        setAmount(amount);
                        setReferenceNum(trans_id)
                        console.log('payment_plans', payment_plans)                     
                    }
                )
                .catch(err => {
                    setLoading(false);
                    console.log("error", err.response)
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
                        // showLoaded(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => null},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            inititatePayment()
          });     
        return unsubscribe;
      }, [props.navigation]);

      const confirmPayment = (ref_no) => {
        const id = AsyncStorage.getItem('token').then(
            res => {
                const data = {
                  trans_code: ref_no
                }
                axios.post('payment/confirm', data, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        const response = res.data;
                        console.log('completed', response)  
                        const subscript = response.data.subscription.subscription;
                        const color = response.data.subscription.color;
                        AsyncStorage.setItem('subscript', subscript);
                        AsyncStorage.setItem('color', color);
                        // props.navigation.popToTop()                   
                    }
                )
                .catch(err => {
                    setLoading(false);
                    // props.navigation.popToTop()
                    const errorMess = err.response;
                    console.log("error", errorMess)
                    // const code = err.response.status;
                    // if (code === 401) {
                    //     Alert.alert(
                    //         'Error!',
                    //         'Expired Token',
                    //         [
                    //           {text: 'OK', onPress: () => null},
                    //         ],
                    //         { cancelable: false }
                    //       )
                      
                    // } else {
                    //     // showLoaded(true)
                    //     Alert.alert(
                    //         'Network Error',
                    //         'Please Try Again',
                    //         [
                    //           {text: 'OK', onPress: () => null},
                    //         ],
                    //         { cancelable: false }
                    //       )
                    // }
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }

      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
    return (
        <ScrollView style= {styles.container}>
        <Logo width= {240} height= {100} />
        <View style= {styles.paymentContainer}>
        {/* <TouchableOpacity style= {styles.btnStyle}>
            <Text style= {styles.colorText}>
                      {plan}
            </Text>
        </TouchableOpacity> */}
        <View style= {{marginVertical: 20}}>
            <Text style= {{marginVertical: 10}}>
                Enter email address to receive your Invoice
            </Text>
            {/* <ProfileInput onChangeText = {(value) => setFirstname(value)}  value= {firstname} width= "100%" label= "Name" /> */}
            <CustomInput keyboardType= "email-address" onChangeText = {(value) => setEmail(value)}  value= {email} width= "100%" label= "Email" />
            {/* <ProfileInput keyboardType= "phone-pad" onChangeText = {(value) => setPhone(value)}  value= {phone} width= "100%" label= "Phone Number" /> */}
        </View>
        </View>
        {email !== '' ? (
                    <PaystackWebView
                    buttonText="Pay Now"
                    showPayButton={true}
                    paystackKey="pk_test_cda7d1bf15f84d4457f1b4d4475a73cdffaa5aec"
                    amount={amount}
                    billingEmail={email}
                    billingMobile={phone}
                    billingName={firstname}
                    channels={JSON.stringify(["card"])}
                    ActivityIndicatorColor="#51087E"
                    SafeAreaViewContainer={{marginTop: 5}}
                    SafeAreaViewContainerModal={{marginTop: 5}}
                    handleWebViewMessage={(e) => {
                      // handle the message
                    }}
                    onCancel={(e) => {
                      // handle response here
                    }}
                    onSuccess={(res) => {
                      // handle response here
                      console.log("transaction response", res.data.transactionRef.reference);
                      const ref_num = res.data.transactionRef.reference;
                      props.navigation.navigate('Training')
                      confirmPayment(ref_num);
                    }}
                    autoStart={false}
                    refNumber={referenceNum} // this is only for cases where you have a reference number generated
                    renderButton={ (onPress) => <Button
                        onPress={onPress}
                        title="Pay"
                        style= {styles.renderButton}
                        color="#2B2579"
                        accessibilityLabel="Pay Now"
                      />}
                  />
        ) : null }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 25
    },
    btnStyle: {
        color: '#6C0BA9',
        backgroundColor: '#F7EAFF',
        height: 30,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#6C0BA9',
        borderRadius: 5,
        marginVertical: 20
      },
      renderButton: {
          backgroundColor: 'red'
      }
});

export default PaymentPage