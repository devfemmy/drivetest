import React, { useEffect, useState } from 'react';
import {  StyleSheet,ActivityIndicator, View,Text, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButtons from '../../Components/AppButtons';
import Success from '../../assets/images/success.svg';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';

const PractiseQuestions = (props) => {
    const {id} = props.route.params;
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
	  const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [newQuestions2, setNewQuestions] = useState([]);
    const [isquestion, setIsQuestion] = useState(false);
    const [footer, setFooter] = useState(true);
    const [showAnswers, setShowAnswers] = useState(true);
    const [showTip, setShowTip] = useState(true);
    const [showNext, setShowNext] = useState(false);
    const [panelProps, setPanelProps] = useState({
      fullWidth: true,
      openLarge: false,
      showCloseButton: true,
      onlySmall: true,
      closeOnTouchOutside: true,
      // allowTouchOutside: true,

      onClose: () => closePanel(),
      onPressCloseButton: () => closePanel(),
      // ...or any prop you want
    });
    const [isPanelActive, setIsPanelActive] = useState(false);
  
    const openPanel = () => {
      setIsPanelActive(true);
    };
  
    const closePanel = () => {
      setIsPanelActive(false);
    };


    const fetchQuestions = () => {
        const token = AsyncStorage.getItem('token').then(
          res => {
              axios.get(`practice/${id}`, {headers: {Authorization: res}})
              .then(
                
                  res => {
                    console.log("questions", res)
                    const questions = res.data.data.questions;
                    console.log('my Questions', questions)
                    if(questions.length > 0) {
                        setNewQuestions(questions);
                        setLoading(false);
                        
                        
                    }else {
                        setIsQuestion(true);
                        setFooter(false)
                        setLoading(false);
                    }
                      
                     
                  }
              )
              .catch(err => {
                setLoading(false)
                  console.log(err.response)
                  const code = err.response.status;
                  if (code === 401) {
                      Alert.alert(
                          'Error!',
                          'Expired Token',
                          [
                            {text: 'OK', onPress: () => null},
                          ],
                          { cancelable: false }
                        )
                    
                  } else {
                    // setLoading(false)
                      Alert.alert(
                          'Network Error',
                          'Please Try Again',
                          [
                            {text: 'OK', onPress: () => null},
                          ],
                          { cancelable: false }
                        )
                  }
    
                    
                    console.log(err.response.status)
    
              })
          }
      )
      .catch( err => {console.log(err)}) 
      };

      useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchQuestions()
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
    const newQuestions = newQuestions2;

    // const questions = newQuestions;

    const handleAnswerOptionClick = (answer_flag, option_id) => {
    
    setShowAnswers(false);
    openPanel()
    setShowNext(true)
    setShowTip(false)
		if (answer_flag == "1") {
			setScore(score + 1);
		}


  };
  const changeCurrentState = () => {
    closePanel()
    setShowNext(false)
    const nextQuestion = currentQuestion + 1;
		if (nextQuestion < newQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setShowAnswers(true)
      setShowTip(true)
		} else {
            setShowScore(true);
            setFooter(false)
		}
  }
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FDB813" />
          </View>
        );
      }
    return (
        <SafeAreaView style= {styles.container}>
        <ScrollView style= {styles.scroll} >
            {isquestion ? <Text style= {{textAlign: 'center'}}>No Questions Available</Text>
        :     
        <View>
        {showScore ? (
            // <View>
            //     <Text>
            //     You scored {score} out of {newQuestions.length}
            //     </Text>
                
            // </View>
                        <View style= {{flex: 1}}>
                        <View style= {{alignItems: 'center'}}>
                            <Success width= {200} height= {250} />
                            <Text style= {{fontSize: 22,textAlign: 'center', fontWeight: 'bold', marginVertical: 5}}>Practise Questions Completed</Text>
                        </View>
                        <View style= {styles.lowerContainer}>
                          <View style= {styles.flexContainer}>
                            <Text style= {styles.textStyle}>
                              Correct Answers
                            </Text>
                            <Text style= {styles.textStyle2}>
                           {score}
                            </Text>
                          </View>
                          <View style= {styles.flexContainer}>
                            <Text style= {styles.textStyle}>
                              Incorrect Answers
                            </Text>
                            <Text style= {styles.textStyle2}>
                            {newQuestions.length - score}
                            </Text>
                          </View>
                          <View style= {styles.flexContainer}>
                            <Text style= {styles.textStyle}>
                              Total Scores
                            </Text>
                            <Text style= {styles.textStyle2}>
                            {newQuestions.length}
                            </Text>
                          </View>
                          <View style= {styles.flexContainer}>
                            <Text style= {styles.textStyle}>
                              Obtained Scores
                            </Text>
                            <Text style= {styles.textStyle2}>
                            {score}
                            </Text>
                          </View>
                          <AppButtons source= {require('../../assets/images/replay.png')}  onPress= {() => props.navigation.goBack()} bg= "#FBB03B" textColor= "white" text=" Retake Practise Questions" />
                        </View>
                      </View>
        ) : (
            <>
                <View style= {styles.questionContainer}>
                    <View>
                        <Text style= {styles.textStyle4}>Question {currentQuestion + 1} of {newQuestions.length}</Text>
                    </View>
                    <View>
                        <Text style= {styles.textStyle5}>
                        {newQuestions[currentQuestion].question}
                        </Text>
                        {newQuestions[currentQuestion].image === null ? null: 
                      <View style= {styles.imageContainer}>
                      <Image 
                      defaultSource= {require('../../assets/images/placeholder2.png')}
                      style= {styles.imageStyle} source= {{uri: newQuestions[currentQuestion].image}} />
                      </View>
                        }
                       
                        
                        </View>
                </View>
                {showAnswers ? 
                  <ScrollView style= {styles.answerContainer}>
                  {newQuestions[currentQuestion].options.map((option) => (
                      <TouchableOpacity style= {styles.btnContainer} onPress={() => handleAnswerOptionClick(option.answer_flag, option.id)}>
                         
                          <Text style= {styles.textStyle3}>
                          {option.option_text}
                          </Text>
                      </TouchableOpacity>
                  ))}
                </ScrollView> :
                <ScrollView style= {styles.answerContainer}>
                {newQuestions[currentQuestion].options.map((option, index) => {
                    if (option.answer_flag == "1") {
                      return (
                        <TouchableOpacity style= {styles.btnContainer2} >
                       
                        <Text style= {styles.textStyle8}>
                        {option.option_text}
                        </Text>
                     </TouchableOpacity>
                      )

                    }else {
                      return (
                        <TouchableOpacity  style= {styles.btnContainer3}>
                       
                        <Text style= {styles.textStyle3}>
                        {option.option_text}
                        </Text>
                    </TouchableOpacity>
                      )

                    }

                }     
                
                )}
            </ScrollView>             
                }

            </>
        )}

        </View>
        }
            {showNext ? (<TouchableOpacity style= {styles.btns} onPress={changeCurrentState} >
                    <Text style= {{fontSize: 16, color: '#2B2579'}}>Next</Text>
              </TouchableOpacity>): null }
        </ScrollView>
        {footer ? <SwipeablePanel closeIconStyle= {styles.closeIconStyle} style= {styles.panelStyle} {...panelProps} isActive={isPanelActive}>
        <ScrollView style= {styles.footerScroll}>

            <Text style= {styles.tipStyle}>TIP:</Text>
                {showTip ? 
            null:
            <Text style= {styles.tipStyle2}>
                
            {newQuestions[currentQuestion].tip}
            </Text> 
            
            }
        </ScrollView>
        </SwipeablePanel> : null}

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        // padding: 25
    },
    scroll: {
      // padding: 25,
      paddingHorizontal: 25,
      minHeight: Dimensions.get('window').height/1.5
      // minHeight: Dimensions.get('window').height/1.2,
    },
    questionContainer: {
        marginVertical: 15,
        // backgroundColor: 'red'
    },
    textStyle4: {
        textAlign: 'center',
        color: '#BBC2CC',
        fontSize: 15
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5
    },
    imageStyle: {
      height: 180,
      width: 180,
      resizeMode: 'cover',
    },
    textStyle5: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    },
    textStyle8: {
      color: 'white',
      fontWeight: 'bold'
    },
    answerContainer: {
      // height: Dimensions.get('window').height/3,
    },
    textStyle3: {
        color: '#2E2E2E'
    },
    btnContainer: {
        minHeight: 50,
        borderWidth: 1,
        borderColor: '#E6EAF0',
        backgroundColor: 'white',
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    btnContainer2: {
      minHeight: 50,
      borderWidth: 1,
      borderColor: '#E6EAF0',
      backgroundColor: 'green',
      marginVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
  },
  closeIconStyle: {
    backgroundColor: '#2B2579'
  },
  btnContainer3: {
    minHeight: 50,
    // borderWidth: 2,
    // borderColor: 'red',
    backgroundColor: 'white',
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
},
    btns: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderColor: '#2B2579',
      borderWidth: 2,
      marginBottom: 25,
      marginTop: 25,
      marginHorizontal: 25,
      borderRadius: 5
  },
    tipStyle: {
        color: '#FFFFFF',
        opacity: 0.4,
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center'
      },
      tipStyle2: {
        color: "#fff",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
      },
    footer: {
        minHeight: '10%',
        backgroundColor: '#2B2579',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20
    },
    panelStyle: {
      backgroundColor: '#2B2579',
      paddingHorizontal: 20
     
    },
    lowerContainer: {
        padding: 25
      },
      flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        borderColor: '#E6EAF0',
        borderWidth: 1,
        marginVertical: 10
      },
      textStyle: {
        color: '#BBC2CC'
      },
      textStyle2: {
        color: 'black',
        fontWeight: 'bold'
      },
      footerScroll: {
        height: Dimensions.get('window').height/1.7
      }
});

export default PractiseQuestions