import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import MyAppText from './MyAppText';

const TimeSlot = (props) => {
    const styles = StyleSheet.create({
        container: {
    
        },
        btnContainer: {
            minWidth: 100,
            minHeight: 50,
            marginRight: 10,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.bg,
            borderColor: props.border,
            borderWidth: 1,
            paddingHorizontal: 10
        },
        dateStyle: {
            // backgroundColor: 'red',
            marginHorizontal: 10
        },
        slotStyle: {
            color: '#BBC2CC',
            fontSize: 15
        }
    });
    return (
        <View style= {styles.container}>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnContainer}>
                <Text>
                    {props.date}
                </Text>
                <Text style= {styles.slotStyle}>
                    {props.slot}
                </Text>
            </TouchableOpacity>
        </View>
    )
}



export default TimeSlot