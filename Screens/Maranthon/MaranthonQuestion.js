import React, { useEffect, useState } from 'react';
import {  StyleSheet,ActivityIndicator, View,Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButtons from '../../Components/AppButtons';
import Success from '../../assets/images/success.svg';


const MaranthonQuestions = (props) => {
    // const {id} = props.route.params;
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [newQuestions2, setNewQuestions] = useState([]);
    const [isquestion, setIsQuestion] = useState(false);
    const [footer, setFooter] = useState(true)

    const fetchQuestions = () => {
        const token = AsyncStorage.getItem('token').then(
          res => {
              axios.get(`marathon`, {headers: {Authorization: res}})
              .then(
                
                  res => {
                    console.log("questions", res)
                    const questions = res.data.data.questions;
                    console.log('my Questions', questions)
                    if(questions.length > 0) {
                        setNewQuestions(questions);
                        setLoading(false)
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
        // const response = await fetch(
        //   `https://opentdb.com/api.php?amount=10&difficulty=medium`
        // );
        // const questions = await response.json();
    
    
        // await this.setState({ questions: results, loading: false });
      };

      useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchQuestions()
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
    const newQuestions = newQuestions2;

    // const questions = newQuestions;

      const handleAnswerOptionClick = (answer_flag) => {
		if (answer_flag == "1") {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < newQuestions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
            setShowScore(true);
            setFooter(false)
		}
	};
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FDB813" />
          </View>
        );
      }
    return (
        <View style= {styles.container}>
        <ScrollView style= {{padding: 25}} >
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
                            <Text style= {{fontSize: 22,textAlign: 'center', fontWeight: 'bold', marginVertical: 5}}>Marathon Questions Completed</Text>
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
                          <AppButtons source= {require('../../assets/images/replay.png')}  onPress= {() => props.navigation.goBack()} bg= "#FBB03B" textColor= "white" text=" Retake Marathon Questions" />
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
                       
                        
                        </View>
                </View>
                <View>
                    {newQuestions[currentQuestion].options.map((option) => (
                        <TouchableOpacity style= {styles.btnContainer} onPress={() => handleAnswerOptionClick(option.answer_flag)}>
                           
                            <Text style= {styles.textStyle3}>
                            {option.option_text}
                            </Text>
                            </TouchableOpacity>
                    ))}
                </View>
            </>
        )}
        </View>
        }

        </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        // padding: 25
    },
    questionContainer: {
        marginVertical: 25
    },
    textStyle4: {
        textAlign: 'center',
        color: '#BBC2CC',
        fontSize: 15
    },
    textStyle5: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    },
    textStyle3: {
        color: '#2E2E2E'
    },
    btnContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E6EAF0',
        backgroundColor: 'white',
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
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
        minHeight: 150,
        backgroundColor: '#2B2579',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20
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
      }
});

export default MaranthonQuestions