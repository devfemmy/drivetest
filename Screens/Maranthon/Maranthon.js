import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import MaranthonIcon from '../../assets/images/marathon.svg';
import AppButtons from '../../Components/AppButtons';

const Maranthon = (props) => {
    return (
        <View style= {styles.container}>
            <ScrollView>
                <View style= {styles.scroll}>
                <MaranthonIcon width= {300} height= {250} />
                <Text style= {styles.textStyle}>Marathon</Text>
                <Text style= {styles.textStyle2}>Answer unlimited question on the go.</Text>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
            <AppButtons onPress= {() => props.navigation.navigate('MarathonQuestion')} bg= "#FBB03B" textColor= "white" text= "Get Started" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        // height: Dimensions.get('window').height
    },
    scroll: {
        alignItems: 'center',  
    },
    textStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    textStyle2: {
        color: '#BBC2CC',
        marginVertical: 10,
        textAlign: 'center'
    },
    footer: {
        backgroundColor: 'white',
        minHeight: 100,
        paddingHorizontal: 25
    }
});

export default Maranthon