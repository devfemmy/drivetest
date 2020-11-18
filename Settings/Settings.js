import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import Card from '../Components/Card';
import ProfileIcon from '../assets/images/profile.svg';
import PasswordIcon from '../assets/images/password.svg';
import LogOutIcon from '../assets/images/logout.svg';
import { AuthContext }  from '../Navigations/TabNav';



const Settings = (props) => {
    const { signOut} = React.useContext(AuthContext);
    return (
        <ScrollView style= {styles.container}>
            {/* <ScrollView> */}
                <View style= {styles.firstContainer}>
                    <View>
                        <Text style= {{fontSize: 24, fontWeight: 'bold'}}>Settings</Text>
                        <Text style= {{marginVertical: 5, opacity: 0.4}}>
                        Edit you profile/account here
                        </Text>
                    </View>
                    <View>
                        <Card onPress= {() => props.navigation.navigate('Profile')}>
                            <View>
                                <Text style= {styles.textStyle3}>
                                    Profile
                                </Text>
                                <Text style= {{opacity: 0.5}}>Edit Your Profile here</Text>
                            </View>
                            <View>
                                <ProfileIcon width= {100} height= {100} />
                            </View>
                        </Card>
                        <Card onPress= {() => props.navigation.navigate('ChangePassword')}>
                            <View>
                                <Text style= {styles.textStyle3}>
                                    Change Password
                                </Text>
                                <Text style= {{opacity: 0.5}}>Change your password here</Text>
                            </View>
                            <View>
                                <PasswordIcon width= {100} height= {100} />
                            </View>
                        </Card>
                        <Card onPress= {() => signOut()}>
                            <View>
                                <Text style= {styles.textStyle3}>
                                    Logout
                                </Text>
                                {/* <Text style= {{opacity: 0.5}}>Change your password here</Text> */}
                            </View>
                            <View>
                                <LogOutIcon width= {50} height= {40} />
                            </View>
                        </Card>

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
        fontSize: 18,
        marginVertical: 5
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

export default Settings