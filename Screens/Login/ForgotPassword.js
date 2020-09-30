import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';

const ForgotPassword = () => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.upperContainer}>
                <Text style= {styles.textStyle}>
                Forgot Password
                </Text>
                <Text style= {styles.textStyle2}>Enter your registered email to reset password</Text>

            </View>
            <View style= {styles.lowerContainer}>
                    <CustomInput labelText= "Email Address" />
                    <AppButtons bg= "#FBB03B" textColor= "white" text= "Reset Password" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        padding: 25
    },
    upperContainer: {
        paddingVertical: 25
    },
    lowerContainer: {
        marginVertical: 50
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#2B2579",
        marginVertical: 15
    },
    textStyle2: {
        color: '#000000'
    }
})

export default ForgotPassword