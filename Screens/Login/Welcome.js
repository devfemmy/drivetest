import React from 'react';
import { View, StyleSheet, 
    ScrollView, ImageBackground, 
    Text, Dimensions, 
    TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = (props) => {
    return (
        <View style = {styles.container}>
            <ScrollView horizontal={true} pagingEnabled={true}>
                <ImageBackground source= {require('../../assets/Sliders/slide.png')}
                style= {styles.sliderImg}
                >
                        <View style= {styles.btnOuterContainer}>
                            <TouchableOpacity onPress= {()=> props.navigation.navigate('Drive Test')} style= {styles.btnContainer}>
                            <Text>GET STARTED</Text>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
                <ImageBackground source= {require('../../assets/Sliders/slide2.png')}
                style= {styles.sliderImg}
                >
                        <View style= {styles.btnOuterContainer}>
                            <TouchableOpacity onPress= {()=> props.navigation.navigate('Drive Test')} style= {styles.btnContainer}>
                            <Text>GET STARTED</Text>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
                <ImageBackground source= {require('../../assets/Sliders/slide3.png')}
                style= {styles.sliderImg}
                >
                        <View style= {styles.btnOuterContainer}>
                            <TouchableOpacity onPress= {()=> props.navigation.navigate('Drive Test')} style= {styles.btnContainer}>
                            <Text>GET STARTED</Text>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'white'
    },
    textCont: {
        width: '50%'
    },
    textStyle: {
        fontSize: 17,
        color: 'white',
        marginHorizontal: 50,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    colorText: {
        color: '#6C0BA9'
    },
    boldText: {
        fontSize: 18,
        marginBottom: 3,
        fontWeight: 'bold'
    },
    imageStyle: {
        width: 100,
        height: 110
    },
    card: {
        backgroundColor: 'white',
        minHeight: 120,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
        marginBottom: 20,
    },
    textStyle2: {
        fontSize: 16,
        color: '#A884BF',
        marginVertical: 20,
    },
    headerStyle: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    lowerContainer: {
       height: Dimensions.get('window').height/2.5,
       display: 'flex',
       justifyContent: 'space-around'
    },
    sliderImg: {
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain'
      
    },
    sliderImg2: {
        paddingVertical: 120,
        paddingHorizontal: 50,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      
    },
    btnOuterContainer: {
        marginHorizontal: 40,
        marginVertical: '30%'
    },
    btnContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#51087E',
        fontWeight: 'bold',
        fontSize: 35,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default WelcomeScreen