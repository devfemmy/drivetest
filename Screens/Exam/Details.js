import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';


const Details = (props) => {
    return (
        <View style= {styles.container}>
            <ScrollView>
                <View style= {styles.firstContainer}>
                    <View>
                            <View style= {styles.flexContainer}>
                                    <ExamIcon width= {40} height= {40} />
                                    <View style= {{width: '83%'}}> 
                                        <Text style= {styles.textStyle3}>Drive Test Lekki</Text>
                                        <Text style= {styles.textStyle4}>16, lore ispum road, lekki, Lagos, Nigeria .</Text>
                                    </View>
                                </View>
                    </View>
                    </View>
                    <View style= {styles.secondContainer}>
                    <Text style= {styles.textStyle4}>Date and Time</Text>
                    <Text style= {styles.textStyle3}>Tomorrow, 20 Jul, 1:00am</Text>
                    </View>
                    <View style= {styles.secondContainer}>
                    <Text style= {styles.textStyle4}>Price</Text>
                    <Text style= {styles.textStyle3}>₦15,000</Text>
                    </View>
                    <View style= {styles.thirdContainer}>
                        <Text style= {{fontWeight: 'bold', fontSize: 15, textAlign: 'center', marginBottom: 20}}>Please Provide your information below</Text>
                        <CustomInput labelText= "Full name" />
                        <CustomInput labelText= "Mobile" />
                        <CustomInput labelText= "Email" />
                    </View>
            </ScrollView>
            <View style= {styles.footer}>
            <AppButtons bg= "#2B2579" textColor= "white" text= "Confirm and Make Payment" />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1
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
        minHeight: 40,
        borderColor: '#E6EAF0',
        borderTopWidth: 1,
        padding: 25
    },
    thirdContainer: {
        backgroundColor: '#F2F7FF',
        minHeight: 200,
        padding: 20
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
    },
    footer: {
        minHeight: 120,
        backgroundColor: 'white',
        padding: 25
    }
});

export default Details