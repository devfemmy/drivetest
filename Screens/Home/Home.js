import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { View, StyleSheet,Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CarImage from '../../assets/images/car.svg';
import SlotBtn from '../../Components/SlotBtn';
import axios from '../../axios';

const HomePage = (props) => {
    const [loading, setLoading] = useState('');
    const [response, setResponses] = useState([]);

    const getPractiseQuestion = () => {
        setLoading(true)
        axios.get('practice').then(
            res => {
                setLoading(false)
                console.log('response', res)
                const data = res.data.data;
                setResponses(data)
            }
        ).catch(

            err => {
                setLoading(true)
                console.log(err)
            }
        )
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getPractiseQuestion()
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
    if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FDB813" />
          </View>
        );
      }
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
               {/* <View>
                <ScrollView horizontal>
                        <SlotBtn name= "Novice" />
                        <SlotBtn name= "Beginner" />
                        <SlotBtn name= "Intermediate" />
                        <SlotBtn name= "Advanced" />
                    </ScrollView>
               </View> */}
               {response.map (
                   (resp, index) => {
                       const id = resp.id;
                       const new_level = parseInt(resp.level)
                       const level = parseInt(resp.level)/4;
                       const name = `Level ${resp.level}`;
                       if (new_level === 1) {
                        return (
                            <TouchableOpacity key= {index} onPress= {() => props.navigation.navigate('Question', {id: id})}>
                            <View style= {styles.slotBox}>
                                    <View style= {styles.flexContainer}>
                                        <Text style= {styles.textStyle3}>
                                            {resp.name}
                                        </Text>
                                        <Text style= {styles.textStyle4}>
                                            {name}
                                        </Text>
                                    </View>
                                    <Progress.Bar height= {10}  color= "#FF0000" borderColor= "#2B2579" progress={level} width={null} />
                            </View>
                           </TouchableOpacity>
                           )
                       } else if (new_level === 2) {
                        return (
                            <TouchableOpacity key= {index} onPress= {() => props.navigation.navigate('Question', {id: id})}>
                            <View style= {styles.slotBox}>
                                    <View style= {styles.flexContainer}>
                                        <Text style= {styles.textStyle3}>
                                            {resp.name}
                                        </Text>
                                        <Text style= {styles.textStyle4}>
                                            {name}
                                        </Text>
                                    </View>
                                    <Progress.Bar height= {10} color= "#FF4E00" borderColor= "#2B2579" progress={level} width={null} />
                            </View>
                           </TouchableOpacity>
                           )
                       } else if (new_level === 3) {
                        return (
                            <TouchableOpacity key= {index} onPress= {() => props.navigation.navigate('Question', {id: id})}>
                            <View style= {styles.slotBox}>
                                    <View style= {styles.flexContainer}>
                                        <Text style= {styles.textStyle3}>
                                            {resp.name}
                                        </Text>
                                        <Text style= {styles.textStyle4}>
                                            {name}
                                        </Text>
                                    </View>
                                    <Progress.Bar height= {10}  color= "#FFE200" borderColor= "#2B2579" progress={level} width={null} />
                            </View>
                           </TouchableOpacity>
                           ) 
                       } else if (new_level === 4) {
                        return (
                            <TouchableOpacity key= {index} onPress= {() => props.navigation.navigate('Question', {id: id})}>
                            <View style= {styles.slotBox}>
                                    <View style= {styles.flexContainer}>
                                        <Text style= {styles.textStyle3}>
                                            {resp.name}
                                        </Text>
                                        <Text style= {styles.textStyle4}>
                                            {name}
                                        </Text>
                                    </View>
                                    <Progress.Bar height= {10} color= "#BDFD40" borderColor= "#2B2579" progress={level} width={null} />
                            </View>
                           </TouchableOpacity>
                           )
                       }

                   }
               )}
           </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        height: Dimensions.get('window').height
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
        height: Dimensions.get('window').height/1.6

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