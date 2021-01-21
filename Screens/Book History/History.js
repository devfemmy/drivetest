import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView,ActivityIndicator, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';
import axios from '../../axios'
import { Button } from 'react-native';


const History = (props) => {
    const [loading, setLoading] = useState('');
    const [response, setResponses] = useState([]);

    const getAppointment = () => {
        setLoading(true)
        const id = AsyncStorage.getItem('token').then(
            res => {
                axios.get(`my/slots`, {headers: {Authorization: res}})
                .then(
                  
                    res => {
                        setLoading(false)
                        console.log("appointments", res.data)
                        const responses = res.data.data
                        setResponses(responses)
                       
                    }
                )
                .catch(err => {
                    console.log(err.response)
                    setLoading(false)
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
                              {text: 'OK', onPress: () => null},
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

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getAppointment()
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
            {/* <ScrollView> */}
                <View style= {styles.firstContainer}>
                    <View>
                        <Text style= {{fontSize: 24, fontWeight: 'bold'}}>Book History</Text>
                        <Text style= {{marginVertical: 5, opacity: 0.4}}>View all your book history here</Text>
                    </View>
                    </View>
                <View style= {styles.secondContainer}>
                    {response.map(
                        (app, index) => {
                            if (app.status_name === "Booked" ) {
                                return (
                                    <View key= {index} style= {styles.flexContainer}>
                                    <View style= {{width: '60%'}}>
                                    <Text style= {{...styles.textStyle3, textAlign: 'left', fontSize: 18,}}>
                                        {app.center_name}
                                    </Text>
                                    <Text style= {{...styles.textStyle3, textAlign: 'left', fontSize: 14, marginVertical: 5, color: '#2B2579'}}>
                                        {app.slot}
                                    </Text>
                                    <Text style= {{...styles.textStyle4, textAlign: 'left'}}>
                                        {app.address}
                                    </Text>
                                    <View style= {{marginVertical: 5}}>
                                    <Button
                                        onPress={() => props.navigation.navigate('Payment', {payment_id: app.id})}
                                        title="Pay Now"
                                        color="#2B2579"
                                        accessibilityLabel="Pay Now"
                                    />
                                    </View>
                                    </View>
                                    <View style= {{width: '40%'}}>
                                        <Text style= {{...styles.textStyle4, textAlign: 'right'}}>
                                            {app.appointment_start}
                                        </Text>
                                        {/* <Text style= {{...styles.textStyle3, textAlign: 'right'}}>₦15,000</Text> */}
                                        <Text style= {{...styles.textStyle5, textAlign: 'right', fontSize: 17}}>
                                            {app.status_name}
                                        </Text>
                                    </View>
                                </View>
                                )
                            } else {
                                return (
                                    <View key= {index} style= {styles.flexContainer}>
                                    <View style= {{width: '60%'}}>
                                    <Text style= {{...styles.textStyle3, textAlign: 'left', fontSize: 18,}}>
                                        {app.center_name}
                                    </Text>
                                    <Text style= {{...styles.textStyle3, textAlign: 'left', fontSize: 14, marginVertical: 5, color: '#2B2579'}}>
                                        {app.slot}
                                    </Text>
                                    <Text style= {{...styles.textStyle4, textAlign: 'left'}}>
                                        {app.address}
                                    </Text>
                                    </View>
                                    <View style= {{width: '40%'}}>
                                        <Text style= {{...styles.textStyle4, textAlign: 'right'}}>
                                            {app.appointment_start}
                                        </Text>
                                        {/* <Text style= {{...styles.textStyle3, textAlign: 'right'}}>₦15,000</Text> */}
                                        <Text style= {{...styles.textStyle5, textAlign: 'right', fontSize: 17}}>
                                            {app.status_name}
                                        </Text>
                                    </View>
                                </View>
                                )
                            }

                        }
                    )}

                 
                    </View>
            {/* </ScrollView> */}
        </ScrollView>
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
        borderColor: '#E6EAF0',
        borderBottomWidth: 1,
        // marginVertical: 10,
        paddingVertical: 15
        // paddingRight: 25
    },
    firstContainer: {
        padding: 25
    },
    secondContainer: {
        minHeight: 40,
        borderColor: '#E6EAF0',
        borderTopWidth: 1,
        padding: 25,
        backgroundColor: '#FAFCFF'
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
    textStyle5: {
        marginVertical: 5,
        color: '#FBB03B'
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

export default History