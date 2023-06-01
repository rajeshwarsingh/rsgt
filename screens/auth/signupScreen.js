import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, Dimensions, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gender from '../../components/gender';
import DOBPicker from '../../components/DOBPicker';
import StandardsPicker from '../../components/standardsPicker';
import { signupApi } from '../../api/index';

const { width } = Dimensions.get('window');

const standards = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const SignupScreen = ({ navigation }) => {

    const [name, setname] = useState('');
    const [mobileNumber, setmobileNumber] = useState('');
    const [email, setemail] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedStandards, setSelectedStandards] = useState('');
    const [selectedDOB, setSelectedDOB] = useState(null);
    const [selectedMedium, setSelectedMedium] = useState('');
    const [selectedSchoolorCollage, setSchoolCollage] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleSelectGender = (gender) => {
        setSelectedGender(gender);
    };

    const handleStandards = (standardIdx) => {
        setSelectedStandards(standards[standardIdx])
    };

    const handleDOBChange = (date) => {
        setSelectedDOB(date);
    };

    const isValidatedSignup = (data)=>{

        if(!data.name){
            Alert.alert(`Please provide Full Name`)
            return false
        }
        if(!data.mobileNumber){
            alert(`Please provide Mobile Number`)
            return false
        }
        if(!data.gender){
            Alert.alert(`Please provide Gender`)
            return false
        }
        return true
    } 
    const handleSignup = async () => {
        // Prepare the signup data
        const signupData = {
            name,
            mobileNumber,
            email,
            gender: selectedGender,
            standard: selectedStandards,
            dob: selectedDOB,
            medium: selectedMedium,
            schoolorCollage: selectedSchoolorCollage,
            address: selectedAddress,
        };

        if(!isValidatedSignup(signupData)){
            return
        }

        try {
            // Make the API call
            await signupApi(signupData);
            await AsyncStorage.setItem('userDetails', JSON.stringify(signupData));
            
            // Display toast message
            Toast.show({
                type: 'success',
                text1: 'Signup Successful',
                text2: 'You have successfully signed up.',
            });
            return navigation.push('Home');
        } catch (error) {
            // Signup failed, show error message
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Signup Failed',
                text2: 'Failed to sign up. Please try again.',
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}>
                    {signupImage()}
                    {createAccountText()}
                    {nameInfo()}
                    {mobileNumberField()}
                    {emailField()}
                    {standard()}
                    {gender()}
                    {DOB()}
                    {medium()}
                    {schoolorCollage()}
                    {address()}
                    {signupButton()}
                </ScrollView>
                {alreadyAccountInfo()}
            </View>
        </SafeAreaView>
    )

    function nameInfo() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginTop: Sizes.fixPadding * 3.0, }}>
                <MaterialIcons name="person-outline" size={18} color={Colors.blackColor} />
                <TextInput
                    value={name}
                    onChangeText={(value) => setname(value)}
                    placeholder='Full Name'
                    placeholderTextColor={Colors.grayColor}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function mobileNumberField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, }}>
                <MaterialIcons name="phone-android" size={18} color={Colors.blackColor} />
                <TextInput
                    value={mobileNumber}
                    onChangeText={(value) => setmobileNumber(value)}
                    placeholder='MobileNumber'
                    placeholderTextColor={Colors.grayColor}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    secureTextEntry={true}
                    keyboardType="phone-pad"
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

    function standard() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <Ionicons name="school-outline" size={18} color={Colors.blackColor} />
                {/* <StandardsPicker /> */}
                <StandardsPicker selectedStandards={selectedStandards} onStandards={handleStandards} />
            </View>
        )
    }

    function gender() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <MaterialIcons name="person-outline" size={18} color={Colors.blackColor} />
                <View>
                    <Gender selectedGender={selectedGender} onSelectGender={handleSelectGender} />
                </View>
            </View>
        )
    }

    function DOB() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <MaterialIcons name="date-range" size={18} color={Colors.blackColor} />
                <DOBPicker onDOBChange={handleDOBChange} />
                {/* <DOBPicker /> */}
            </View>
        )
    }
    function medium() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <Ionicons name="book" size={24} color="black" style={styles.icon} />

                <TextInput
                    value={selectedMedium}
                    onChangeText={(value) => setSelectedMedium(value)}
                    placeholder='Medium of study'
                    placeholderTextColor={Colors.grayColor}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                />
            </View>
        )
    }
    function schoolorCollage() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <MaterialCommunityIcons name="school" size={24} color="black" style={styles.icon} />
                <TextInput
                    value={selectedSchoolorCollage}
                    onChangeText={(value) => setSchoolCollage(value)}
                    placeholder='School/Collage'
                    placeholderTextColor={Colors.grayColor}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                />
            </View>
        )
    }
    function address() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginTop: Sizes.fixPadding * 3.0, }}>
                <Entypo name="location" size={18} color={Colors.blackColor} />
                <TextInput
                    value={selectedAddress}
                    onChangeText={(value) => setSelectedAddress(value)}
                    placeholder='Address'
                    placeholderTextColor={Colors.grayColor}
                    style={styles.textAreaStyle}
                    cursorColor={Colors.primaryColor}
                    multiline={true}
                    numberOfLines={2}
                />
            </View>
        )
    }
    function alreadyAccountInfo() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.grayColor14Regular }}>
                Already have an account? { }
                <Text
                    // onPress={() => { navigation.push('Login') }}
                    style={{ ...Fonts.primaryColor14Medium }}
                >
                    Home
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

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSignup}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Sign Up
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

    function createAccountText() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                <Text style={{ ...Fonts.primaryColor20SemiBold }}>
                    Create An Account
                </Text>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor13Regular }}>
                    Please Fill the Details and Create your Account
                </Text>
            </View>
        )
    }

    function signupImage() {
        return (
            <Image
                source={require('../../assets/images/auth/signup.png')}
                style={styles.imageStyle}
            />
        )
    }
}

export default SignupScreen

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: width / 3.5,
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
    textAreaStyle: {
        ...Fonts.blackColor14Medium,
        flex: 1,
        height: 40.0,
        marginLeft: Sizes.fixPadding,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.extraLightGrayColor,
        borderRadius: Sizes.fixPadding * 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
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
    }
})