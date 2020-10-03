import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import ExamSlot from '../../Components/ExamSlot';
import SlotButtons from '../../Components/SlotButtons';
import TimeSlot from '../../Components/TimeSlot';

const Slot = (props) => {
    return (
        <ScrollView style= {styles.container}>
                <View style= {styles.firstContainer}>
                <View>
                        <View style= {styles.flexContainer}>
                                <ExamIcon width= {40} height= {40} />
                                <View>
                                    <Text style= {styles.textStyle3}>Drive Test Lekki</Text>
                                    <Text style= {styles.textStyle4}>16, lore ispum road, lekki, Lagos, Nigeria .</Text>
                                </View>
                            </View>
                        </View>
                </View>
                <View style= {styles.secondContainer}>
                    <ScrollView horizontal>
                        <TimeSlot border= "rgba(187, 194, 204, 1)" slot= "16 Slots" date= "Monday, 2020-10-05" />
                        <TimeSlot border= "rgba(187, 194, 204, 1)" slot= "10 Slots" date= "Tuesday, 2020-10-06" />
                        <TimeSlot border= "rgba(187, 194, 204, 1)" slot= "10 Slots" date= "Tuesday, 2020-10-06" />
                        <TimeSlot border= "rgba(187, 194, 204, 1)" slot= "10 Slots" date= "Tuesday, 2020-10-06" />

                    </ScrollView>
                </View>
                <View style= {styles.lowerContainer}>
                    <Text style= {{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Monday, 2020-10-05</Text>
                    <View style= {styles.flexContainer}>
                    <ExamSlot onPress= {() => props.navigation.navigate('Details')} border= "#2B2579" color= "#2B2579" slot= "9:00am - 10:00am" />
                    <ExamSlot onPress= {() => props.navigation.navigate('Details')} border= "#2B2579" color= "#2B2579" slot= "10:00am - 11:00am" />
                    <ExamSlot onPress= {() => props.navigation.navigate('Details')} border= "#2B2579" color= "#2B2579" slot= "11:00am - 12:00pm" />
                    <ExamSlot onPress= {() => props.navigation.navigate('Details')} border= "#2B2579" color= "#2B2579" slot= "9:00am - 10:00am" />
                    <ExamSlot onPress= {() => props.navigation.navigate('Details')} border= "#2B2579" color= "#2B2579" slot= "9:00am - 10:00am" />
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