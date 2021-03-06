import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const CustomInput = (props) => {

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: props.width,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        elevation: 5,
        minHeight: 50,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    label: {
        color: '#B4BBC6',
        fontSize: 10,
        marginBottom: 0,
        marginTop: 3
    },
    textInputStyle: {
        fontWeight: 'bold',
        color: '#231E50',
        fontSize: 15,
        paddingVertical: 5
    }
});
    return (
        <View style= {styles.container}>
            <Text style = {styles.label}>
                {props.labelText}
            </Text>
            <TextInput
            style= {styles.textInputStyle}
            secureTextEntry = {props.secureTextEntry}
            selectionColor = {props.Color}
            defaultValue = {props.defaultValue}
            value= {props.value}
            editable= {props.editable}
            autoCorrect= {false}
            onChangeText = {props.onChangeText}
            autoCapitalize= 'none'
            keyboardType = {props.keyboardType}
            />
        </View>
    )
}


export default CustomInput;