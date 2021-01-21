import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet,ActivityIndicator, ScrollView, Image,Alert, Text } from 'react-native';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import SlotButtons from '../../Components/SlotButtons';
import axios from '../../axios';

const NextAppointment = (props) => {
    const {center_id, address} = props.route.params;
    const [loading, setLoading] = useState('');
    const [response, setResponses] = useState([]);

    const getExamSlot = () => {
        setLoading(true)
        const id = AsyncStorage.getItem('token').then(
            res => {
                axios.get(`center/slots/next/${center_id}`, {headers: {Authorization: res}})
                .then(
                  
                    res => {
                        setLoading(false)
                        console.log("centers", res.data)
                        const responses = res.data.data;
                        setResponses(responses)
                       
                    }
                )
                .catch(err => {
                    console.log(err.response)
                    setLoading(false);
                    setResponses([])
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getExamSlot()
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
                <View style= {styles.firstContainer}>
                    <View style= {styles.flexContainer}>
                        <View style= {{width: '60%'}}>
                            <Text style= {styles.textStyle}>Book Exam Slot</Text>
                            <Text style= {styles.textStyle2}>Book exam slot at your most comfortable time.</Text>
                        </View>
                        <Image 
                        source= {require('../../assets/images/exam.png')}
                        style= {{width: 150, height: 100, resizeMode: 'contain'}} />
                    </View>
                </View>
                <View style= {styles.secondContainer}>
                {response.length === 0 ? (<Text style= {{textAlign: 'center'}}>No appointment for center</Text>) : null}
                    {response.map((resp, index) => {
                        const slot_id = resp.slot_id;
                        const name = resp.slot;
                        const payment_id = resp.id;
                        console.log('payment', resp)
                        return (
                            <View key= {index} style= {styles.card}>
                            <View style= {{padding: 20}}>
                            <View style= {styles.flexContainer}>
                                    <ExamIcon width= {40} height= {40} />
                                    <View style= {{width: '80%'}}>
                                        <Text style= {styles.textStyle3}>
                                            {`${resp.slot}`}
                                        </Text>
                                        <Text style= {styles.textStyle4}>
                                            {address}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style= {styles.lowerContainer}>
                            <View style= {{width: '100%'}}>
                                        <Text style= {styles.textStyle4}>Next Available slot: </Text>
                                        <Text style= {{fontWeight: 'bold'}}>
                                            {resp.appointment_start}
                                        </Text>
                            </View>
                                <View style= {styles.flexContainer}>
                                    <View>
                                        <Text style= {styles.textStyle4}>Exam fees: </Text>
                                        <Text style= {{fontWeight: 'bold'}}>
                                            {`₦${resp.price}`}
                                        </Text>
                                    </View>
                                    <View style= {{width: '50%'}}>
                                    <SlotButtons onPress= {() => props.navigation.navigate('Slots', {slot_id: slot_id, address: address, name: name, price: resp.price,
                                     payment_id: resp.id})} 
                                    bg= "#FBB03B" textColor= "white" text= "Book Exam Slot" />
                                    </View>
                                </View>
                            </View>
                        </View>
                        )
                    })}
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    firstContainer: {
        backgroundColor: '#2B2579',
        minHeight: 150,
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    secondContainer: {
        margin: 25
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        marginVertical: 0
    },
    card: {
        backgroundColor: '#FFFFFF',
        minHeight: 150,
        borderColor: '#E6EAF0',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical:10
        // padding: 20
    },
    lowerContainer: {
       borderTopColor: '#E6EAF0',
       borderTopWidth: 1,
       paddingHorizontal: 10,
       paddingVertical: 5
    }
});

export default NextAppointment