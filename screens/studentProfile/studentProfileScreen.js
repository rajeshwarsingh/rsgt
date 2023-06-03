import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getProfile } from '../../utils/index';

const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sup', 'Oct', 'Nov', 'Des'];

const StudentProfileScreen = ({ navigation }) => {

    // const signupData = {
    //     name,
    //     mobileNumber,
    //     email,
    //     gender: selectedGender,
    //     standard: selectedStandards,
    //     dob: selectedDOB,
    //     medium: selectedMedium,
    //     schoolorCollage: selectedSchoolorCollage,
    //     address: selectedAddress,
    // };

    const [adharNo, setAdharNo] = useState('1234 5698 4569 1578');
    const [academicYear, setAcademicYear] = useState('2020-2021');
    const [admissionClass, setAdmissionClass] = useState('XI');
    const [oldAdmissionNo, setOldAdmissionNo] = useState('A00125');
    const [dateOfAdmission, setDateOfAdmission] = useState('01 Apr 2018');
    const [dateOfBirth, setDateOfBirth] = useState('17 October 2002')
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarFor, setCalendarFor] = useState('');
    const [parntMailId, setParntMailId] = useState('parent123@gmail.com');
    const [motherName, setMotherName] = useState('Jenny Smith');
    const [fatherName, setFatherName] = useState('Cameron Smith');
    const [address, setAddress] = useState('Westheimer Rd. Santa Ana, Illinois');
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    const [profile, setProfile] = useState({});

    useEffect(() => {
        fetchProfile();
    }, [])

    async function fetchProfile() {
        const data = await getProfile();
        console.log("@@@@@@@@@@@@@@@@@:",data)
        setProfile(data)
        setAdmissionClass(data?.aadhar)
        setOldAdmissionNo(data?.aadhar)
        setDateOfAdmission(data?.aadhar)
        setDateOfBirth(data?.dob)
        setParntMailId(data?.aadhar)
        setMotherName(data?.aadhar)
        setFatherName(data?.aadhar)
        setAddress(data?.address)
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <ImageBackground
                source={require('../../assets/images/bgImage.png')}
                style={{ width: '100%', height: 250, flex: 1, }}
                resizeMode="stretch"
            >
                {header()}
                <View style={styles.sheetStyle}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {profileInfo()}
                        {adharNoAndAcademicYearInfo()}
                        {admissionClassAndOldAdmissionNoInfo()}
                        {dateOfAdmissionAndBirthInfo()}
                        {parentMailIdInfo()}
                        {motherNameInfo()}
                        {fatherNameInfo()}
                        {addressInfo()}
                    </ScrollView>
                    {saveButton()}
                </View>
            </ImageBackground>
            {calendar()}
            {changeProfilePicOptionsSheet()}
        </SafeAreaView>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { setShowBottomSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowBottomSheet(false)}
                    style={styles.bottomSheetStyle}
                >
                    <Text style={{ ...Fonts.blackColor18SemiBold }}>
                        Choose Option
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row', }}>
                        {changeProfilePicOptionsSort({
                            bgColor: '#009688',
                            icon: <Entypo name="camera" size={22} color={Colors.whiteColor} />,
                            option: 'Camera'
                        })}
                        <View style={{ marginHorizontal: Sizes.fixPadding * 3.0, }}>
                            {changeProfilePicOptionsSort({
                                bgColor: '#00A7F7',
                                icon: <MaterialCommunityIcons name="image" size={24} color={Colors.whiteColor} />,
                                option: 'Gallery'
                            })}
                        </View>
                        {changeProfilePicOptionsSort({
                            bgColor: '#DD5A5A',
                            icon: <MaterialCommunityIcons name="delete" size={24} color={Colors.whiteColor} />,
                            option: 'Remove photo'
                        })}
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function changeProfilePicOptionsSort({ bgColor, icon, option }) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowBottomSheet(false) }}>
                <View style={{ ...styles.changeProfilePicOptionsIconWrapStyle, backgroundColor: bgColor, }}>
                    {icon}
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, width: 50.0, ...Fonts.grayColor13Regular }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.pop() }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Save
                </Text>
            </TouchableOpacity>
        )
    }

    function addressInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    Permanent Address
                </Text>
                <TextInput
                    value={address}
                    onChangeText={(value) => { setAddress(value) }}
                    cursorColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function fatherNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    Father Name
                </Text>
                <TextInput
                    value={fatherName}
                    onChangeText={(value) => { setFatherName(value) }}
                    cursorColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function motherNameInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    Mother Name
                </Text>
                <TextInput
                    value={motherName}
                    onChangeText={(value) => { setMotherName(value) }}
                    cursorColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function parentMailIdInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    Parent Mail ID
                </Text>
                <TextInput
                    value={parntMailId}
                    onChangeText={(value) => { setParntMailId(value) }}
                    cursorColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function calendar() {
        const handleConfirm = (e, date) => {
            calendarFor == 'birthDate'
                ?
                setDateOfBirth(`${date.getUTCDate()} ${monthsList[date.getUTCMonth()]} ${date.getFullYear()}`)
                :
                setDateOfAdmission(`${date.getUTCDate()} ${monthsList[date.getUTCMonth()]} ${date.getFullYear()}`)
            setShowCalendar(false)
        };
        return (
            showCalendar && <DateTimePicker
                mode="date"
                value={new Date()}
                onChange={handleConfirm}
                maximumDate={new Date()}
            />
        )
    }

    function dateOfAdmissionAndBirthInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: Sizes.fixPadding }}>
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                        Date of Admission
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setCalendarFor('admissionDate')
                            setShowCalendar(true)
                        }}
                    >
                        <Text style={{ ...styles.textFieldStyle, paddingTop: Sizes.fixPadding - 5.0 }}>
                            {dateOfAdmission}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                        Date of Birth
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setCalendarFor('birthDate')
                            setShowCalendar(true)
                        }}
                    >
                        <Text style={{ ...styles.textFieldStyle, paddingTop: Sizes.fixPadding - 5.0 }}>
                            {dateOfBirth}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function admissionClassAndOldAdmissionNoInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: Sizes.fixPadding }}>
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                        Admission Class
                    </Text>
                    <TextInput
                        value={admissionClass}
                        onChangeText={(value) => { setAdmissionClass(value) }}
                        cursorColor={Colors.primaryColor}
                        style={styles.textFieldStyle}
                    />
                </View>
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                        Old Admission No
                    </Text>
                    <TextInput
                        value={oldAdmissionNo}
                        onChangeText={(value) => { setOldAdmissionNo(value) }}
                        cursorColor={Colors.primaryColor}
                        style={styles.textFieldStyle}
                    />
                </View>
            </View>
        )
    }

    function adharNoAndAcademicYearInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding }}>
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                        Adhar No
                    </Text>
                    <TextInput
                        value={adharNo}
                        onChangeText={(value) => { setAdharNo(value) }}
                        cursorColor={Colors.primaryColor}
                        style={styles.textFieldStyle}
                    />
                </View>
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                        Academic Year
                    </Text>
                    <TextInput
                        value={academicYear}
                        onChangeText={(value) => { setAcademicYear(value) }}
                        cursorColor={Colors.primaryColor}
                        style={styles.textFieldStyle}
                    />
                </View>
            </View>
        )
    }
  
    function profileInfo() {
        console.log('@@@@@@@@@@@@profile :',profile)
        return (
            <View style={styles.profileInfoWrapStyle}>
                <Image
                    source={require('../../assets/images/students/student1.png')}
                    style={{ width: 75, height: 75, borderRadius: Sizes.fixPadding, }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold, }}>
                    {profile?.name}
                    </Text>
                    <Text style={{ ...Fonts.grayColor16Regular }}>
                    Class {profile?.standard} | Gender: {profile?.gender}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setShowBottomSheet(true) }}
                    style={{ position: 'absolute', right: 12.0, top: 12.0, }}
                >
                    <Image
                        source={require('../../assets/images/icons/camera.png')}
                        style={styles.cameraIconStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} onPress={() => { navigation.pop() }} />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18SemiBold }}>
                    My Profile
                </Text>
            </View>
        )
    }
}

export default StudentProfileScreen

const styles = StyleSheet.create({
    sheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        flex: 1,
    },
    headerWrapStyle: {
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cameraIconStyle: {
        width: 22.0,
        height: 22.0,
        resizeMode: 'contain',
        tintColor: Colors.grayColor,
    },
    profileInfoWrapStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        margin: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding + 2.0
    },
    textFieldStyle: {
        paddingBottom: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor14Medium,
        borderBottomColor: Colors.lightGrayColor,
        borderBottomWidth: 1.0,
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
    changeProfilePicOptionsIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
})