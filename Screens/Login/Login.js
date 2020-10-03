import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';
import Logo from '../../assets/images/dtlogo.svg';
const Login = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.upperContainer}>
                <Logo width= {200} height= {150} />
            </View>
            <View style= {styles.lowerContainer}>
                    <Text style= {styles.textStyle}>Login to your drive test account</Text>
                    <CustomInput labelText= "Email Address" />
                    <CustomInput labelText= "Password" />
                    <AppButtons onPress= {() => console.log('Signing in')} bg= "#FBB03B" textColor= "white" text= "Login" />
                    <Text onPress= {() => props.navigation.navigate('ForgotPassword')} style= {styles.textStyle2}>Forgot Password?</Text>
                    <Text style= {{color: 'white', marginTop: 15, textAlign: 'center', opacity: 0.5}} >Dont have an account?</Text>
                    <Text onPress= {() => props.navigation.navigate('CreateAccount')} style= {{...styles.textStyle2}}>Create account here</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2579',

    },
    upperContainer: {
        backgroundColor: '#fff',
        // height: Dimensions.get('window').height/3.5,
        padding: 25,
        alignItems: 'center'
       
    },
    lowerContainer: {
        // backgroundColor: '#2B2579',
        paddingHorizontal: 25,
        paddingVertical: 30

    },
    textStyle: {
        color: '#FFFFFF',
        opacity: 0.5,
        marginVertical: 15
    },
    textStyle2: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default Login