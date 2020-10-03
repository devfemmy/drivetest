import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Picker,
  Button, Dimensions, Image
} from "react-native";
import Question from "../../Components/Question";
import Success from '../../assets/images/success.svg';
import AppButtons from "../../Components/AppButtons";
// import { Link } from "react-router-native";
// import Question from "../components/Question";

export default class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      questions: [],

      current: 0,
      correctScore: 5,
      totalScore: 50,

      results: {
        score: 0,
        correctAnswers: 0
      },
      completed: false
    };
  }

  fetchQuestions = async () => {
    await this.setState({ loading: true });
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&difficulty=medium`
    );
    const questions = await response.json();

    const { results } = questions;

    results.forEach(item => {
      item.id = Math.floor(Math.random() * 10000);
    });

    await this.setState({ questions: results, loading: false });
  };

  reset = () => {
    this.setState(
      {
        questions: [],
        current: 0,
        results: {
          score: 0,
          correctAnswers: 0
        },
        completed: false
      },
      () => {
        this.fetchQuestions();
      }
    );
  };

  submitAnswer = (index, answer) => {
    const question = this.state.questions[index];
    const isCorrect = question.correct_answer === answer;
    const results = { ...this.state.results };

    results.score = isCorrect ? results.score + 5 : results.score;
    results.correctAnswers = isCorrect
      ? results.correctAnswers + 1
      : results.correctAnswers;

    this.setState({
      current: index + 1,
      results,
      completed: index === 9 ? true : false
    });
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  render() {
    let icon = (
      <Image style= {{width: 25, height: 25, resizeMode: 'contain'}} source= {require('../../assets/images/replay.png')} />
    );
    const buttonText = `${icon} Retake Practise Questions`
    return (
      <View style={styles.container}>
        {!!this.state.loading && (
          <View style={styles.loadingQuestions}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text>Please wait while we are loading questions for you</Text>
          </View>
        )}
        
        {!!this.state.questions.length > 0 &&
          this.state.completed === false && (
            <Question
              onSelect={answer => {
                this.submitAnswer(this.state.current, answer);
              }}
              question={this.state.questions[this.state.current]}
              correctPosition={Math.floor(Math.random() * 3)}
              current={this.state.current}
            />
          )}

        <View
          // style={{ alignItems: "center", justifyContent: "center" }}
        >
          {this.state.completed === true && (
            <View>
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
                  {this.state.results.correctAnswers}
                  </Text>
                </View>
                <View style= {styles.flexContainer}>
                  <Text style= {styles.textStyle}>
                    Incorrect Answers
                  </Text>
                  <Text style= {styles.textStyle2}>
                  {10 - this.state.results.correctAnswers}
                  </Text>
                </View>
                <View style= {styles.flexContainer}>
                  <Text style= {styles.textStyle}>
                    Total Scores
                  </Text>
                  <Text style= {styles.textStyle2}>
                  {50}
                  </Text>
                </View>
                <View style= {styles.flexContainer}>
                  <Text style= {styles.textStyle}>
                    Obtained Scores
                  </Text>
                  <Text style= {styles.textStyle2}>
                  {this.state.results.score}
                  </Text>
                </View>
                <AppButtons source= {require('../../assets/images/replay.png')}  onPress= {this.reset} bg= "#FBB03B" textColor= "white" text=" Retake Practise Questions" />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height
  },

  loadingQuestions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
