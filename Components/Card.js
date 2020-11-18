import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Card = (props) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            minHeight: 50,
            // maxHeight: 120,
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: '100%',
            marginVertical: 20,
            borderRadius: 5,
            marginRight: 15,
            shadowColor: "#1F1F1F1F",
            shadowOffset: {
                width: 5,
                height: 5,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84,
    
            elevation: 5,
       
        },
        flexContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
        }

    })
    return (
        <View>
            <TouchableOpacity onPress= {props.onPress}>
            <View style= {styles.container}>
                <View style= {styles.flexContainer}>
                {props.children}
                </View>
            </View>
            </TouchableOpacity>
        </View>

    )
}

export default Card;

