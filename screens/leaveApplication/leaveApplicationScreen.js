import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, ImageBackground, TextInput, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-date-ranges';

const LeaveApplicationScreen = ({ navigation }) => {

    const [teacherName, setTeacherName] = useState('');
    const [applicationTitle, setApplicationTitle] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [description, setDescription] = useState('');

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
                        {nameOfClassTeacherInfo()}
                        {applicationTitleInfo()}
                        {fromToDateInfo()}
                        {descriptionInfo()}
                        {applyButton()}
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

    function applyButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.pop() }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Apply
                </Text>
            </TouchableOpacity>
        )
    }

    function descriptionInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    Description
                </Text>
                <TextInput
                    placeholder='Ex. I have very strong ....'
                    value={description}
                    onChangeText={(value) => { setDescription(value) }}
                    cursorColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function fromToDateInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.grayColor13Regular }}>
                    From - To
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <View style={{ alignItems: 'center' }}>
                        <DatePicker
                            style={{ height: 30.0, borderWidth: 0.0, alignItems: 'flex-start', }}
                            customStyles={{
                                placeholderText: { ...Fonts.grayColor14Regular },
                                headerStyle: { backgroundColor: Colors.primaryColor },
                                headerMarkTitle: { ...Fonts.whiteColor22Bold },
                                headerDateTitle: { ...Fonts.whiteColor17Bold },
                                contentText: { ...Fonts.blackColor14Medium },
                            }}
                            placeholder={'Ex. 12 Dec 2020 - 15 Dec 2020'}
                            mode={'range'}
                            markText='Select date'
                            selectedBgColor={Colors.primaryColor}
                            blockBefore={true}
                            allowFontScaling={false}
                            ButtonStyle={styles.calenderOkButtonStyle}
                            ButtonTextStyle={{ ...Fonts.whiteColor17Bold }}
                            ButtonText="Ok"
                            dateSplitter="-"
                            onConfirm={(date) => { setToDate(date.endDate), setFromDate(date.startDate) }}
                            headFormat="DD MMM YYYY"
                            outFormat="DD MMM YYYY"
                        />
                        <MaterialCommunityIcons
                            name="calendar-month-outline"
                            size={22}
                            color={Colors.primaryColor}
                            style={{ position: 'absolute', right: 0.0, zIndex: 0 }}
                        />
                    </View>
                    <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, }} />
                </View>
            </View>
        )
    }

    function applicationTitleInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    Application Title
                </Text>
                <TextInput
                    placeholder='Ex. Fever'
                    value={applicationTitle}
                    onChangeText={(value) => { setApplicationTitle(value) }}
                    cursorColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function nameOfClassTeacherInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    Name of Class Teacher
                </Text>
                <TextInput
                    placeholder='Ex. Kathryn Murphy'
                    value={teacherName}
                    onChangeText={(value) => { setTeacherName(value) }}
                    cursorColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} onPress={() => { navigation.pop() }} />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18SemiBold }}>
                    Leave Application
                </Text>
            </View>
        )
    }
}

export default LeaveApplicationScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        flex: 1,
    },
    textFieldStyle: {
        paddingBottom: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor14Medium,
        borderBottomColor: Colors.lightGrayColor,
        borderBottomWidth: 1.0,
    },
    calenderOkButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding * 3.0,
        elevation: 1.0,
        shadowColor: Colors.primaryColor
    },
    buttonStyle: {
        backgroundColor: Colors.secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 3.0,
        elevation: 1.0,
        shadowColor: Colors.secondaryColor,
        borderColor: '#FFAB1B95',
        borderWidth: 1.0,
    }
})