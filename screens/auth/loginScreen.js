import { StyleSheet, Text, View, SafeAreaView, StatusBar, BackHandler, Image, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [isPwdRemember, setisPwdRemember] = useState(true);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}>
                    {loginImage()}
                    {welcomeText()}
                    {emailField()}
                    {passwordField()}
                    {rememberAndForgetPasswordInfo()}
                    {loginButton()}
                    {googleAndFacebookButton()}
                </ScrollView>
                {dontAccountInfo()}
            </View>
            {exitInfo()}
        </SafeAreaView>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.exitInfoWrapStyle]}>
                    <Text style={{ ...Fonts.whiteColor13Regular }}>
                        Press back once again to exit
                    </Text>
                </View>
                :
                null
        )
    }

    function dontAccountInfo() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.grayColor14Regular }}>
                Don’t have an account? { }
                <Text
                    onPress={() => { navigation.push('Signup') }}
                    style={{ ...Fonts.primaryColor14Medium }}
                >
                    Sign Up
                </Text>
            </Text>
        )
    }

    function googleAndFacebookButton() {
        return (
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.googleAndFacebookButtonStyle}
                >
                    <Image
                        source={require('../../assets/images/icons/google.png')}
                        style={{ width: 25.0, height: 25.0, resizeMode: 'contain' }}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                        Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.googleAndFacebookButtonStyle}
                >
                    <Image
                        source={require('../../assets/images/icons/facebook.png')}
                        style={{ width: 20.0, height: 25.0, resizeMode: 'contain', }}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                        Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function loginButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('Signup') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Log In
                </Text>
            </TouchableOpacity>
        )
    }

    function rememberAndForgetPasswordInfo() {
        return (
            <View style={styles.rememberAndForgetPasswordInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setisPwdRemember(!isPwdRemember) }}
                    style={{ width: 115, flexDirection: 'row', alignItems: 'center', }}
                >
                    <View style={styles.radioButtonStyle}>
                        {isPwdRemember ? <View style={styles.selectedRadioButtonStyle} /> : null}
                    </View>
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor13Regular }}>
                        Remember Me
                    </Text>
                </TouchableOpacity>
                <Text style={{ minWidth: 112, ...Fonts.blackColor13Medium }}>
                    Forget Password?
                </Text>
            </View>
        )
    }

    function passwordField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginTop: 0.0, marginBottom: Sizes.fixPadding }}>
                <MaterialIcons name="lock-open" size={18} color={Colors.blackColor} />
                <TextInput
                    value={password}
                    onChangeText={(value) => setpassword(value)}
                    placeholder='Password'
                    placeholderTextColor={Colors.grayColor}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    secureTextEntry={true}
                />
            </View>
        )
    }

    function emailField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, }}>
                <MaterialIcons name="mail-outline" size={18} color={Colors.blackColor} />
                <TextInput
                    value={email}
                    onChangeText={(value) => setemail(value)}
                    placeholder='Email'
                    placeholderTextColor={Colors.grayColor}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function welcomeText() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                <Text style={{ ...Fonts.primaryColor20SemiBold }}>
                    Welcome Log In
                </Text>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor13Regular }}>
                    Please Login to Continue Using our app
                </Text>
            </View>
        )
    }

    function loginImage() {
        return (
            <Image
                source={require('../../assets/images/auth/login.png')}
                style={styles.imageStyle}
            />
        )
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: width / 3.0,
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        flex: 1,
        height: 20.0,
        marginLeft: Sizes.fixPadding,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.extraLightGrayColor,
        borderRadius: Sizes.fixPadding * 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    rememberAndForgetPasswordInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    radioButtonStyle: {
        width: 14.0,
        height: 14.0,
        borderRadius: 7.0,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedRadioButtonStyle: {
        width: 8.0,
        height: 8.0,
        backgroundColor: Colors.grayColor,
        borderRadius: 4.0,
    },
    buttonStyle: {
        backgroundColor: Colors.secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 3.0,
        elevation: 1.0,
        shadowColor: Colors.secondaryColor,
        borderColor: '#FFAB1B95',
        borderWidth: 1.0,
    },
    googleAndFacebookButtonStyle: {
        flex: 1,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.extraLightGrayColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
    },
    exitInfoWrapStyle: {
        backgroundColor: Colors.blackColor,
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})