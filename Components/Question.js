import React from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions } from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answer: null
    };
  }

  // renderOptions = question => {
  //   if (question.type === "boolean") {
  //     return [
  //       <RadioButton style= {styles.radioContainer} value={"True"} key={1}>
  //         <Text style={styles.radioText}>True</Text>
  //       </RadioButton>,

  //       <RadioButton style= {styles.radioContainer} value={"False"} key={2}>
  //         <Text style={styles.radioText}>False</Text>
  //       </RadioButton>
  //     ];
  //   } else {
  //     const result = [];

  //     question.options.forEach((item, index) => {
  //       let key = `${question.id}-${index}`;

  //       if (index === this.props.correctPosition) {
  //         let key2 = `${question.id}-100`;
  //         result.push(
  //           <RadioButton style= {styles.radioContainer}  value={question.correct_answer} key={key2}>
  //             <Text style={styles.radioText}>{question.correct_answer}</Text>
  //           </RadioButton>
  //         );
  //       }

  //       result.push(
  //         <RadioButton style= {styles.radioContainer} value={item} key={key}>
  //           <Text style={styles.radioText}>{item}</Text>
  //         </RadioButton>
  //       );
  //     });

  //     return result;
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style= {styles.scroll}>
            <View>
            <View style= {{alignItems: 'center'}}>
                <Image style= {{width: 150, height: 150, resizeMode: 'contain'}} source= {require('../assets/images/stop.png')} />
            </View>
            <Text style={{ fontSize: 15, color: "#BBC2CC", textAlign: "center", marginVertical: 15 }}>
            Question {this.props.current + 1} out of 2
            </Text>
            <Text style={{ fontSize: 16,textAlign: 'center', fontWeight: "bold", color: "#242126", marginVertical: 15}}>
            {this.props.question.question}
            </Text>
            <RadioGroup
            // style= {styles.radioContainer}
            thickness = {0}
            size= {0}
            activeColor= "white"
            color='white'
            highlightColor='#19AF13'
            onSelect={(index, answer) => this.setState({ answer })}
            selectedIndex={null}
            >
            {/* {this.renderOptions(this.props.question)} */}
            </RadioGroup>
            </View>
        </ScrollView>
        <View style= {styles.footer}>
            <Text style= {styles.tipStyle}>TIP:</Text>
            <Text style= {styles.tipStyle2}>You must stop your car if you see this sign</Text>
            <TouchableOpacity style= {styles.btns} onPress={() => {
                this.props.onSelect(this.state.answer);
            }} >
                <Text style= {{fontSize: 16, color: 'white'}}>Next</Text>
            </TouchableOpacity>
            {/* <Button
            title="Next"

            /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioText: {
    fontSize: 16,
    textAlign: 'center'
  },
  container: {
      flex: 1,
    //   minHeight: Dimensions.get('window').height,
    //   backgroundColor: 'red'
  },
  scroll: {
    // minHeight: Dimensions.get('window').height/1.5,
    paddingHorizontal: 20,
    marginBottom: 30,
    paddingBottom: 50
  },
  btns: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderColor: 'white',
      borderWidth: 1,
      marginVertical: 15,
      marginHorizontal: 75,
      borderRadius: 5
  },
  radioContainer: {
    //   backgroundColor: 'red',
      marginVertical: 5,
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderColor: '#E6EAF0',
      borderWidth: 1,
      borderRadius: 3,
      height: 60
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
  }
});
