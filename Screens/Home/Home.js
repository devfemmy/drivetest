import React from 'react';
import * as Progress from 'react-native-progress';
import { View, StyleSheet,Text, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CarImage from '../../assets/images/car.svg';
import SlotBtn from '../../Components/SlotBtn';

const HomePage = (props) => {
    return (
        <ScrollView  style= {styles.container}>
        <View style= {styles.firstContainer}>
            <View style= {styles.flexContainer}>
                    <View style= {{width: '60%'}}>
                        <Text style= {styles.textStyle}>Training</Text>
                        <Text  style= {styles.textStyle2}>Train your self by answering our categorised set of questions</Text>
                    </View>
                    <CarImage width= {150} height= {150} />
            </View>
        </View>

           <View style= {styles.lowerContainer}>
               <View>
                <ScrollView horizontal>
                        <SlotBtn name= "Novice" />
                        <SlotBtn name= "Beginner" />
                        <SlotBtn name= "Intermediate" />
                        <SlotBtn name= "Advanced" />
                    </ScrollView>
               </View>
               <TouchableOpacity onPress= {() => props.navigation.navigate('Question')}>
                <View style= {styles.slotBox}>
                        <View style= {styles.flexContainer}>
                            <Text style= {styles.textStyle3}>Practise Test 1</Text>
                            <Text style= {styles.textStyle4}>Advanced</Text>
                        </View>
                        <Progress.Bar height= {10} color= "#BDFD40" borderColor= "#2B2579" progress={1.0} width={null} />
                </View>
               </TouchableOpacity>
               <TouchableOpacity>
                <View style= {styles.slotBox}>
                        <View style= {styles.flexContainer}>
                            <Text style= {styles.textStyle3}>Practise Test 2</Text>
                            <Text style= {styles.textStyle4}>Intermediate</Text>
                        </View>
                        <Progress.Bar height= {10} color= "#FFE200" borderColor= "#2B2579" progress={0.8} width={null} />
                    </View>
               </TouchableOpacity>
               <TouchableOpacity>
                <View style= {styles.slotBox}>
                        <View style= {styles.flexContainer}>
                            <Text style= {styles.textStyle3}>Practise Test 3</Text>
                            <Text style= {styles.textStyle4}>Beginner</Text>
                        </View>
                        <Progress.Bar height= {10} color= "#FF4E00" borderColor= "#2B2579" progress={0.5} width={null} />
                    </View>
               </TouchableOpacity>
               <TouchableOpacity>
                <View style= {styles.slotBox}>
                        <View style= {styles.flexContainer}>
                            <Text style= {styles.textStyle3}>Practise Test 4</Text>
                            <Text style= {styles.textStyle4}>Novice</Text>
                        </View>
                        <Progress.Bar height= {10} color= "#FF0000" borderColor= "#2B2579" progress={0.3} width={null} />
                    </View>
               </TouchableOpacity>
           </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    firstContainer: {
        height: Dimensions.get('window').height/5.2
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        minHeight: 70
    },
    textStyle: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
    textStyle2: {
        color: '#BBC2CC',
        marginVertical: 5
    },
    lowerContainer: {
        backgroundColor: '#2B2579',
        minHeight: 400,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 25,
        height: Dimensions.get('window').height/1.5

    },
    slotBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: 80,
        marginTop: 25,
    },
    textStyle3: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        opacity: 1
    },
    textStyle4: {
        color: 'rgba(255, 255, 255, 0.5)'
    }
});

export default HomePage