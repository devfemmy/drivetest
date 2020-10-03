import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppButtons from '../../../Components/AppButtons';
import CustomInput from '../../../Components/CustomInput';


const CreateAccount = () => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.upperContainer}>
                <Text style= {styles.textStyle}>
                Create Account
                </Text>
                <View style= {styles.flexContainer}> 
                <CustomInput width= "45%" labelText= "First Name" />
                <CustomInput width= "45%" labelText= "Last name" />
                </View>
                <View>
                <CustomInput width= "100%" labelText= "Phone Number" />
                <CustomInput width= "100%" labelText= "Email Address" />
                <CustomInput width= "100%" labelText= "Date of Birth" />
                <CustomInput width= "100%" labelText= "Gender" />
                </View>
            </View>
            <View style= {styles.lowerContainer}>
                    <AppButtons bg= "#FBB03B" textColor= "white" text= "Create Account" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // minHeight: Dimensions.get('window').height,
        padding: 25
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    upperContainer: {
        paddingVertical: 10
    },
    lowerContainer: {
        marginVertical: 10
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#2B2579",
        marginVertical: 5
    },
    textStyle2: {
        color: '#000000'
    }
})

export default CreateAccount