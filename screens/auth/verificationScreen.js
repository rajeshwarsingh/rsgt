import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import OTPTextView from 'react-native-otp-textinput';
import { Overlay } from '@rneui/themed';

const { width } = Dimensions.get('window');

const VerificationScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {verificationImage()}
                    {verifyText()}
                    {otpFields()}
                    {continuButton()}
                </ScrollView>
            </View>
            {loadingDialog()}
        </SafeAreaView>
    )

    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={{ width: '80%', borderRadius: Sizes.fixPadding - 5.0, padding: 0.0 }}
            >
                <View style={styles.dialogStyle}>
                    <ActivityIndicator
                        size={40}
                        color={Colors.primaryColor}
                        style={{ marginBottom: Sizes.fixPadding }}
                    />
                    <Text style={{ ...Fonts.grayColor15Medium }}>
                        Please Wait...
                    </Text>
                </View>
            </Overlay>
        )
    }

    function otpFields() {
        return (
            <OTPTextView
                containerStyle={{ justifyContent: 'center', }}
                handleTextChange={(text) => {
                    setotpInput(text)
                    if (otpInput.length == 3) {
                        setisLoading(true)
                        setTimeout(() => {
                            setisLoading(false)
                            navigation.push('Home')
                        }, 2000);
                    }
                }}
                inputCount={4}
                keyboardType="numeric"
                tintColor={Colors.primaryColor}
                offTintColor={'transparent'}
                textInputStyle={{ ...styles.textFieldStyle }}
            />
        )
    }

    function continuButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        navigation.push('Home')
                    }, 2000);
                }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function verifyText() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 3.0, alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', ...Fonts.primaryColor20SemiBold }}>
                    Verify Your Mobile Number
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.grayColor13Regular }}>
                    Enter verification code sent on given number
                </Text>
            </View>
        )
    }

    function verificationImage() {
        return (
            <Image
                source={require('../../assets/images/auth/verification.png')}
                style={styles.imageStyle}
            />
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, }}
            />
        )
    }
}

export default VerificationScreen

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        elevation: 1.0,
        shadowColor: Colors.secondaryColor,
        borderColor: '#FFAB1B95',
        borderWidth: 1.0,
    },
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.extraLightGrayColor,
        borderWidth: 1.0,
        ...Fonts.blackColor18Bold,
        height: width / 8.5,
        width: width / 8.5,
        marginHorizontal: Sizes.fixPadding
    },
    imageStyle: {
        width: '100%',
        height: width / 2.7,
        resizeMode: 'contain',
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignSelf: 'center'
    },
    dialogStyle: {
        padding: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0
    }
})