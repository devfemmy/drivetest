import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import CustomInput from '../../Components/CustomInput';


const History = (props) => {
    return (
        <ScrollView style= {styles.container}>
            {/* <ScrollView> */}
                <View style= {styles.firstContainer}>
                    <View>
                        <Text style= {{fontSize: 24, fontWeight: 'bold'}}>Book History</Text>
                        <Text style= {{marginVertical: 5, opacity: 0.4}}>View all your book history here</Text>
                    </View>
                    </View>
                <View style= {styles.secondContainer}>
                    <View style= {styles.flexContainer}>
                        <View style= {{width: '70%'}}>
                        <Text style= {{...styles.textStyle3, textAlign: 'left'}}>Driver Test Lekki</Text>
                        <Text style= {{...styles.textStyle4, textAlign: 'left'}}>16, lore ispum road, lekki, Lagos, Nigeria .</Text>
                        </View>
                        <View>
                            <Text style= {{...styles.textStyle4, textAlign: 'right'}}>20 Jul, 1:00am</Text>
                            <Text style= {{...styles.textStyle3, textAlign: 'right'}}>₦15,000</Text>
                            <Text style= {{...styles.textStyle5, textAlign: 'right'}}>Scheduled</Text>
                        </View>
                    </View>
                 
                    </View>
                    <View style= {styles.secondContainer}>
                    <View style= {styles.flexContainer}>
                        <View style= {{width: '70%'}}>
                        <Text style= {{...styles.textStyle3, textAlign: 'left'}}>Driver Test Lekki</Text>
                        <Text style= {{...styles.textStyle4, textAlign: 'left'}}>16, lore ispum road, lekki, Lagos, Nigeria .</Text>
                        </View>
                        <View>
                            <Text style= {{...styles.textStyle4, textAlign: 'right'}}>20 Jul, 1:00am</Text>
                            <Text style= {{...styles.textStyle3, textAlign: 'right'}}>₦15,000</Text>
                            <Text style= {{...styles.textStyle5, textAlign: 'right', color: 'red'}}>Cancelled</Text>
                        </View>
                    </View>
                 
                    </View>
            {/* </ScrollView> */}
        </ScrollView>
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
        // paddingHorizontal: 20
    },
    firstContainer: {
        padding: 25
    },
    secondContainer: {
        minHeight: 40,
        borderColor: '#E6EAF0',
        borderTopWidth: 1,
        padding: 25,
        backgroundColor: '#FAFCFF'
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
    textStyle5: {
        marginVertical: 5,
        color: '#FBB03B'
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

export default History