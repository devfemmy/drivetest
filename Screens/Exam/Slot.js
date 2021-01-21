import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, ScrollView, Image,ActivityIndicator,Alert, Text } from 'react-native';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import ExamSlot from '../../Components/ExamSlot';
import SlotButtons from '../../Components/SlotButtons';
import TimeSlot from '../../Components/TimeSlot';
import axios from '../../axios';

const Slot = (props) => {
    const {slot_id, address, name, price, payment_id} = props.route.params;
    const [loading, setLoading] = useState('');
    const [slots, setSlots] = useState([]);
    const [title, setTitle] = useState('');
    const [showSlot, setShowSlot] = useState([]);
    const [slotDate, setSlotDate] = useState('');
    const [count, setCount] = useState('');

    const getExamSlot = () => {
        setLoading(true)
        const id = AsyncStorage.getItem('token').then(
            res => {
                axios.get(`slots/${slot_id}`, {headers: {Authorization: res}})
                .then(
                  
                    res => {
                        setLoading(false)
                        console.log("slots", res.data)
                        const responses = res.data.data;
                        setSlots(responses)
                       
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

    getExamSlot()

      }, []);

      function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }
    const showAvailable = (slot, day, date, count) => {
        setShowSlot(slot)
        const appDate = `${date}, ${day} `;
        setSlotDate(appDate);
        const concatCount = `${count} Slots`
        setCount(concatCount)
        
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
                <View style= {styles.firstContainer}>
                <View>
                        <View style= {styles.flexContainer}>
                                <ExamIcon width= {40} height= {40} />
                                <View>
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
                    <ScrollView horizontal>
                        {slots.map(
                            (slot, index) => {
                                return (
                                    <View key= {index}>
                                           <TimeSlot 
                                    onPress= {() => showAvailable(slot.slots, slot.appointment_date, 
                                    slot.appointment_day, slot.count)}
                                           border= "rgba(187, 194, 204, 1)" slot= {`${slot.count} Slots`} date= {`${slot.appointment_day}, ${slot.appointment_date}`} />
                                    </View>
                                 
                                )
                            }
                        )}
{/*                        
                        <TimeSlot border= "rgba(187, 194, 204, 1)" slot= "10 Slots" date= "Tuesday, 2020-10-06" />
                        <TimeSlot border= "rgba(187, 194, 204, 1)" slot= "10 Slots" date= "Tuesday, 2020-10-06" />
                        <TimeSlot border= "rgba(187, 194, 204, 1)" slot= "10 Slots" date= "Tuesday, 2020-10-06" /> */}

                    </ScrollView>
                </View>
                <View style= {styles.lowerContainer}>
                <Text style= {{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
                       {`${slotDate}`}             
                </Text>
                <View style= {styles.flexContainer}>
                {showSlot.map(
                    (show, index) => {
                        const sliceTime = show.app_time.slice(0, 5);
                        const time_id = parseInt(show.id);
                        const slot_id = parseInt(show.slot_id)
                        return (
                            <View key= {index}>
                           <ExamSlot onPress= {() => props.navigation.navigate('Details', 
                           {address: address, name: name, date: slotDate,
                            time_id: time_id, slot_id: slot_id,payment_id: payment_id,
                           price: price, time: tConvert(sliceTime)})} border= "#2B2579" color= "#2B2579" slot= {tConvert(sliceTime)} />                           
                            </View>
                           
                        )
                    }
                )}
                </View>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
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
        backgroundColor: 'rgba(43, 37, 121, 0.05)',
        minHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
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
    }
});

export default Slot