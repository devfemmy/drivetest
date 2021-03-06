import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const AppButtons = (props) => {
    const styles = StyleSheet.create({
        btnContainer: {
            height: 60,
            alignItems: "center",
            justifyContent: 'center',
            backgroundColor: props.bg,
            marginVertical: 15,
            borderRadius: 5,
            borderTopLeftRadius: props.btlr,
            borderTopRightRadius: props.btrr,
           
        },
        textColor: {
            color: props.textColor,
            fontSize: 15,
            fontWeight: 'bold'
        }
    })
    return (
        <View>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnContainer}>
                <Text style= {styles.textColor}>
                  <Image source= {props.source} style= {{width: 18, height: 18, resizeMode: 'contain'}} />
                  {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}



export default AppButtons;