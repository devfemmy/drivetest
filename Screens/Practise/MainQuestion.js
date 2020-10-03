import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator, Linking
} from "react-native";
import Questions from "./Questions";
// import { Link } from "react-router-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Playquiz extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>YOUR ALL FAVORITE QUIZ APP</Text>
        <Text style={styles.paragraph}>
          eQuiz fetches 10 questions from an open API and asks you question one
          by one. You've to answer all the qeustions to understand your IQ
          level.
        </Text>
        <TouchableOpacity onPress= {() => this.props.navigation.navigate('Question')}>
          <Text>Start Question</Text>
        </TouchableOpacity>
        {/* <Linking to={`Questions`} style={styles.button} underlayColor="#f0f4f7">
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Ionicons name="md-play" size={32} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: 10,
                marginTop: 5
              }}
            >
              Start Questions
            </Text>
          </View>
        </Linking> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#3498db",
    color: "white",
    padding: 10
  },

  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10
  },

  paragraph: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
    lineHeight: 25
  }
});
