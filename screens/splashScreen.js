import { StyleSheet, BackHandler, Text, View, SafeAreaView, StatusBar, Dimensions, Image, ActivityIndicator } from 'react-native'
import React, { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Sizes } from '../constants/styles'
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );


    setTimeout(async() => {
        try {
            // Check if the flag or token exists in AsyncStorage
            const userDetailsExists = await AsyncStorage.getItem('userDetails');
        
            // If the flag or token exists, the user has already filled in their details
            if (userDetailsExists) {
              console.log('User details already filled in');
              return navigation.push('Home')
            } else {
              console.log('User details not filled in');
              return navigation.push('Signup')
            //   return navigation.push('Home')
            }
          } catch (error) {
            console.log('Error checking user details:', error);
          }
       
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {appIcon()}
                {appText()}
            </View>
            <ActivityIndicator
                color={Colors.secondaryColor}
                size={60}
                style={{ position: "absolute", bottom: 40.0, alignSelf: 'center' }}
            />
        </SafeAreaView>
    )

    function appText() {
        return (
            <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.blackColor15Medium }}>
                Student App
            </Text>
        )
    }

    function appIcon() {
        return (
            <View style={styles.appIconWrapStyle}>
                <Image
                    source={require('../assets/images/appIcon.png')}
                    style={{ width: width / 7.0, height: width / 7.0, resizeMode: 'contain' }}
                />
            </View>
        )
    }
}

export default SplashScreen

const styles = StyleSheet.create({
    appIconWrapStyle: {
        width: width / 4.2,
        height: width / 4.2,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center'
    }
})