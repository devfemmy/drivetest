import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import ExamIcon from '../../assets/images/examicon.svg';
import AppButtons from '../../Components/AppButtons';
import SlotButtons from '../../Components/SlotButtons';

const Exams = (props) => {
    return (
        <ScrollView style= {styles.container}>
                <View style= {styles.firstContainer}>
                    <View style= {styles.flexContainer}>
                        <View style= {{width: '60%'}}>
                            <Text style= {styles.textStyle}>Book Exam Slot</Text>
                            <Text style= {styles.textStyle2}>Book exam slot at your most comfortable time.</Text>
                        </View>
                        <Image 
                        source= {require('../../assets/images/exam.png')}
                        style= {{width: 150, height: 100, resizeMode: 'contain'}} />
                    </View>
                </View>
                <View style= {styles.secondContainer}>
                    <View style= {styles.card}>
                        <View style= {{padding: 20}}>
                        <View style= {styles.flexContainer}>
                                <ExamIcon width= {40} height= {40} />
                                <View style= {{width: '80%'}}>
                                    <Text style= {styles.textStyle3}>Drive Test Lekki</Text>
                                    <Text style= {styles.textStyle4}>16, lore ispum road, lekki, Lagos, Nigeria .</Text>
                                </View>
                            </View>
                        </View>
                        <View style= {styles.lowerContainer}>
                            <View style= {styles.flexContainer}>
                                <View>
                                    <Text style= {styles.textStyle4}>Exam fees: </Text>
                                    <Text style= {{fontWeight: 'bold'}}>₦15,000</Text>
                                </View>
                                <View>
                                    <Text style= {styles.textStyle4}>Next Available slot: </Text>
                                    <Text style= {{fontWeight: 'bold'}}>30/10/20, 9am</Text>
                                </View>
                                <View>
                                <SlotButtons onPress= {() => props.navigation.navigate('Slots')} bg= "#FBB03B" textColor= "white" text= "Book Exam Slot" />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style= {styles.card}>
                        <View style= {{padding: 20}}>
                        <View style= {styles.flexContainer}>
                                <ExamIcon width= {40} height= {40} />
                                <View style= {{width: '80%'}}>
                                    <Text style= {styles.textStyle3}>Drive Test Lekki</Text>
                                    <Text style= {styles.textStyle4}>16, lore ispum road, lekki, Lagos, Nigeria .</Text>
                                </View>
                            </View>
                        </View>
                        <View style= {styles.lowerContainer}>
                            <View style= {styles.flexContainer}>
                                <View>
                                    <Text style= {styles.textStyle4}>Exam fees: </Text>
                                    <Text style= {{fontWeight: 'bold'}}>₦15,000</Text>
                                </View>
                                <View>
                                    <Text style= {styles.textStyle4}>Next Available slot: </Text>
                                    <Text style= {{fontWeight: 'bold'}}>30/10/20, 9am</Text>
                                </View>
                                <View>
                                <SlotButtons onPress= {() => props.navigation.navigate('Slots')} bg= "#FBB03B" textColor= "white" text= "Book Exam Slot" />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style= {styles.card}>
                        <View style= {{padding: 20}}>
                        <View style= {styles.flexContainer}>
                                <ExamIcon width= {40} height= {40} />
                                <View style= {{width: '80%'}}>
                                    <Text style= {styles.textStyle3}>Drive Test Lekki</Text>
                                    <Text style= {styles.textStyle4}>16, lore ispum road, lekki, Lagos, Nigeria .</Text>
                                </View>
                            </View>
                        </View>
                        <View style= {styles.lowerContainer}>
                            <View style= {styles.flexContainer}>
                                <View>
                                    <Text style= {styles.textStyle4}>Exam fees: </Text>
                                    <Text style= {{fontWeight: 'bold'}}>₦15,000</Text>
                                </View>
                                <View>
                                    <Text style= {styles.textStyle4}>Next Available slot: </Text>
                                    <Text style= {{fontWeight: 'bold'}}>30/10/20, 9am</Text>
                                </View>
                                <View>
                                <SlotButtons onPress= {() => props.navigation.navigate('Slots')} bg= "#FBB03B" textColor= "white" text= "Book Exam Slot" />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style= {styles.card}>
                        <View style= {{padding: 20}}>
                        <View style= {styles.flexContainer}>
                                <ExamIcon width= {40} height= {40} />
                                <View style= {{width: '80%'}}>
                                    <Text style= {styles.textStyle3}>Drive Test Lekki</Text>
                                    <Text style= {styles.textStyle4}>16, lore ispum road, lekki, Lagos, Nigeria .</Text>
                                </View>
                            </View>
                        </View>
                        <View style= {styles.lowerContainer}>
                            <View style= {styles.flexContainer}>
                                <View>
                                    <Text style= {styles.textStyle4}>Exam fees: </Text>
                                    <Text style= {{fontWeight: 'bold'}}>₦15,000</Text>
                                </View>
                                <View>
                                    <Text style= {styles.textStyle4}>Next Available slot: </Text>
                                    <Text style= {{fontWeight: 'bold'}}>30/10/20, 9am</Text>
                                </View>
                                <View>
                                <SlotButtons onPress= {() => props.navigation.navigate('Slots')} bg= "#FBB03B" textColor= "white" text= "Book Exam Slot" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    firstContainer: {
        backgroundColor: '#2B2579',
        minHeight: 150,
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    secondContainer: {
        margin: 25
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        marginVertical: 0
    },
    card: {
        backgroundColor: '#FFFFFF',
        minHeight: 150,
        borderColor: '#E6EAF0',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical:10
        // padding: 20
    },
    lowerContainer: {
       borderTopColor: '#E6EAF0',
       borderTopWidth: 1,
       paddingHorizontal: 10,
       paddingVertical: 5
    }
});

export default Exams