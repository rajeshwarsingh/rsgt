import { StyleSheet, Text, View, BackHandler, SafeAreaView, StatusBar, ScrollView, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { Ionicons } from '@expo/vector-icons';
import { Overlay } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    useEffect(()=>{
        removeItem()
    },[])
    
    async function removeItem(){
        await AsyncStorage.removeItem('userDetails')
    }

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
    const [showLogoutDialog, setshowLogoutDialog] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <ImageBackground
                source={require('../../assets/images/bgImage.png')}
                style={{ width: '100%', height: 250, flex: 1, }}
                resizeMode="stretch"
            >
                {header()}
                <View style={styles.sheetStyle} />
                <View style={{ flex: 1, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ImageBackground
                            source={require('../../assets/images/resultBg.png')}
                            style={{ width: '100%', height: 100, flex: 1, }}
                            resizeMode="stretch"
                        ></ImageBackground>
                        <ImageBackground
                            source={require('../../assets/images/faculties/faculty2.png')}
                            style={{ width: '100%', height: 50, flex: 1, }}
                            resizeMode="stretch"
                        ></ImageBackground>
                        {/* {attendanceAndFeesInfo()} */}
                        {options()}
                    </ScrollView>
                    {/* {joinVideoClassButton()} */}
                </View>
            </ImageBackground>
            {logoutDialog()}
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

    function logoutDialog() {
        return (
            <Overlay
                isVisible={showLogoutDialog}
                onBackdropPress={() => { setshowLogoutDialog(false) }}
                overlayStyle={{ width: '90%', padding: 0.0, borderRadius: Sizes.fixPadding - 5.0 }}
            >
                <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ ...Fonts.grayColor15Medium }}>
                        Sure you want to logout?
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding * 2.5, flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <Text
                            onPress={() => { setshowLogoutDialog(false) }}
                            style={{ ...Fonts.secondaryColor17Bold }}
                        >
                            No
                        </Text>
                        <Text
                            onPress={() => {
                                setshowLogoutDialog(false)
                                navigation.push('Login')
                            }}
                            style={{ ...Fonts.secondaryColor17Bold, marginLeft: Sizes.fixPadding * 2.0 }}
                        >
                            Yes
                        </Text>
                    </View>
                </View>
            </Overlay>
        )
    }

    function joinVideoClassButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('VideoClass') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Join Video Class
                </Text>
            </TouchableOpacity>
        )
    }

    function options() {
        return (
            <View style={styles.optionsWrapStyle}>
                {/* {optionSort({
                    bgColor: Colors.lightPurpleColor,
                    icon: require('../../assets/images/icons/syllabus.png'),
                    title: 'Syllabus',
                    description: 'What to learn',
                    onPress: () => { navigation.push('Syllabus') }
                })} */}
                {optionSort({
                    bgColor: Colors.lightGreenColor,
                    icon: require('../../assets/images/icons/assignment.png'),
                    title: 'Study Materils ',
                    description: 'What to learn',
                    onPress: () => { navigation.push('Assignment') }
                })}
                {/* {optionSort({
                    bgColor: Colors.lightGreenColor,
                    icon: require('../../assets/images/icons/calendar.png'),
                    title: 'Calendar',
                    description: 'View monthly schedule',
                    onPress: () => { navigation.push('Calender') }
                })} */}
                {/* {optionSort({
                    bgColor: Colors.lightCyanColor,
                    icon: require('../../assets/images/icons/timetable.png'),
                    title: 'Time Table',
                    description: 'View daily schedule',
                    onPress: () => { navigation.push('TimeTable') }
                })} */}
                {optionSort({
                    bgColor: Colors.lightPurpleColor,
                    icon: require('../../assets/images/icons/test.png'),
                    title: 'Test',
                    description: 'What to learn',
                    onPress: () => { navigation.push('Test') }
                })}
                {/* {optionSort({
                    bgColor: Colors.lightCreamColor,
                    icon: require('../../assets/images/icons/progressCard.png'),
                    title: 'Progress Card',
                    description: 'What to learn',
                    onPress: () => { navigation.push('ProgressCard') }
                })} */}
                {/* {optionSort({
                    bgColor: Colors.lightGreenColor,
                    icon: require('../../assets/images/icons/leaveApplication.png'),
                    title: 'Leave Application',
                    description: 'What to learn',
                    onPress: () => { navigation.push('LeaveApplication') }
                })} */}
                {optionSort({
                    bgColor: Colors.lightCyanColor,
                    icon: require('../../assets/images/icons/gallery.png'),
                    title: 'School Gallery',
                    description: 'About school',
                    onPress: () => { navigation.push('SchoolGallery') }
                })}
                {/* {optionSort({
                    bgColor: Colors.lightPurpleColor,
                    icon: require('../../assets/images/icons/doubt.png'),
                    title: 'Ask Doubts',
                    description: 'What to learn',
                    onPress: () => { navigation.push('AskDoubts') }
                })} */}
                {optionSort({
                    bgColor: Colors.lightCreamColor,
                    icon: require('../../assets/images/icons/faculties.png'),
                    title: 'Faculties',
                    description: 'List of teacher',
                    onPress: () => { navigation.push('Faculties') }
                })}
                {/* {optionSort({
                    bgColor: Colors.lightGreenColor,
                    icon: require('../../assets/images/icons/message.png'),
                    title: 'Messages',
                    description: 'All conversation',
                    onPress: () => { navigation.push('Messages') }
                })} */}
                {/* {optionSort({
                    bgColor: Colors.lightCyanColor,
                    icon: require('../../assets/images/icons/support.png'),
                    title: 'Support',
                    description: 'Know about us',
                    onPress: () => { navigation.push('Support') }
                })} */}
                {/* {optionSort({
                    bgColor: Colors.lightPurpleColor,
                    icon: require('../../assets/images/icons/lock.png'),
                    title: 'Change Password',
                    description: 'What to learn',
                    onPress: () => { navigation.push('ChangePassword') }
                })} */}
                {/* {optionSort({
                    bgColor: Colors.lightCreamColor,
                    icon: require('../../assets/images/icons/logout.png'),
                    title: 'Logout',
                    description: 'Logout from application',
                    onPress: () => { setshowLogoutDialog(true) }
                })} */}
            </View>
        )
    }

    function optionSort({ bgColor, icon, title, description, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={{ backgroundColor: bgColor, ...styles.singleOptionWrapStyle, }}
            >
                <Image
                    source={icon}
                    style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Medium }}>
                    {title}
                </Text>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    {description}
                </Text>
            </TouchableOpacity>
        )
    }

    function attendanceAndFeesInfo() {
        return (
            <View style={styles.attendanceAndFeeInfoWrapStyle}>
                {attendanceAndFeeInfoSort({
                    title: 'Attendance',
                    value: '80.49%',
                    bgColor: Colors.lightYellowColor,
                    icon: require('../../assets/images/icons/attendance.png'),
                    onPress: () => { navigation.push('Attendance') }
                })}
                {attendanceAndFeeInfoSort({
                    title: 'Fees Due',
                    value: '₹ 6500',
                    bgColor: Colors.lightPinkColor,
                    icon: require('../../assets/images/icons/fees.png'),
                    onPress: () => { navigation.push('FeesDue') }
                })}
            </View>
        )
    }

    function attendanceAndFeeInfoSort({ title, value, bgColor, icon, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.95}
                onPress={onPress}
                style={styles.attendanceAndFeesDetailWrapStyle}
            >
                <View style={{ ...styles.attendanceAndFeesIconWrapStyle, backgroundColor: bgColor }}>
                    <Image
                        source={icon}
                        style={{ width: width / 12.0, height: width / 12.0, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{ marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding - 5.0 }}>
                    <Text style={{ ...Fonts.blackColor34BebasRegular }}>
                        {value}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Medium }}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { navigation.push('StudentProfile') }}
                    >
                        <Image
                            source={require('../../assets/images/students/student1.png')}
                            style={styles.userImageStyle}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.whiteColor18SemiBold }}>
                            Hello, Samantha
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 2.0, ...Fonts.whiteColor15Regular, color: '#ffffff60' }}>
                            Class XI | Roll no: 05
                        </Text>
                    </View>
                </View>
                <Ionicons name="notifications-outline" size={24} color={Colors.whiteColor} onPress={() => { navigation.push('Notification') }} />
            </View>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userImageStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.5,
    },
    sheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        position: 'absolute',
        left: 0.0, right: 0.0,
        height: '100%',
        top: width / 1.8,
    },
    attendanceAndFeeInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding + 5.0,
    },
    attendanceAndFeesDetailWrapStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        padding: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    attendanceAndFeesIconWrapStyle: {
        width: width / 5.5,
        height: width / 5.5,
        borderRadius: (width / 5.5) / 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    singleOptionWrapStyle: {
        width: (width / 2.0) - 25.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    buttonStyle: {
        backgroundColor: Colors.secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        shadowColor: Colors.secondaryColor,
        borderColor: '#FFAB1B95',
        borderWidth: 1.0,
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