import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import MyAppText from './MyAppText';

const SlotBtn = (props) => {
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
            backgroundColor: '#000000',
            opacity: 0.2
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
                <Text  style= {styles.slotStyle}>
                    {props.name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}



export default SlotBtn