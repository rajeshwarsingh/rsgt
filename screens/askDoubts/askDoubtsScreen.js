import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, ImageBackground, TextInput,Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Menu } from 'react-native-material-menu';
import { ScrollView } from 'react-native-gesture-handler';
import { doubtApi, getFaculty, getSubjects } from '../../api/index';
const { height } = Dimensions.get('window');

// const teachersList = [
//     'Kathryn Murphy',
//     'Jane Cooper',
//     'Leslie Alexander',
//     'Brooklyn Simmons',
//     'Jacob Jones',
//     'Courtney Henry',
// ];

// const subjectsList = [
//     'Mathematics',
//     'English',
//     'Economics',
//     'Accounting',
//     'Science',
//     'Computer',
// ];

const AskDoubtsScreen = ({ navigation }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showTeachersMenu, setShowTeachersMenu] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [showSubjectsMenu, setShowSubjectsMenu] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');

    const [teachersList, setTeachersList] = useState([]);
    const [subjectsList, setSubjectsList] = useState([]);
    
    useEffect(() => {
        const fetchSM = async () => {
            try {
                
                const data = await getFaculty();
                // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",data);
                const dataTeacherList = data.map(teacher=>teacher.facultyName);
                console.log("dataTeacherList :",dataTeacherList);
                setTeachersList(dataTeacherList);
            } catch (error) {
                console.error('Error fetching SM:', error);
            }
        };

        fetchSM();
    }, []);

    useEffect(() => {
        const fetchSM = async () => {
            try {
                
                const data = await getSubjects();
                const dataSubjectList = data.map(subject=>subject.name);
                console.log("dataSubjectList :",dataSubjectList);
                setSubjectsList(dataSubjectList);
            } catch (error) {
                console.error('Error fetching SM:', error);
            }
        };

        fetchSM();
    }, []);



    const isValidatedDoubt = (data)=>{
        if(!data.title){
            Alert.alert(`Please provide title`)
            return false
        }
        if(!data.description){
            Alert.alert(`Please provide description`)
            return false
        }
        return true
    } 
    
    const handleDoubt = async () => {
        
        let  userDetails={};
        let name='';
        let mobile='';
        try{
            userDetails = await AsyncStorage.getItem('userDetails');
            userDetails = JSON.parse(userDetails);
            name = userDetails?.name;
            mobile = userDetails?.mobile;
        }catch(e){
            // log the error
            console.log("Error in parsing the userdetails in doubts",e)
        }
        
        // Prepare the doubt data
        const doubtsData = {
            "teacher":selectedTeacher, 
            "subject":selectedSubject, 
            "title":title, 
            "description":description, 
            "name":name, 
            "mobile":mobile,
        };
        if(!isValidatedDoubt(doubtsData)){
            return
        }

        try {
            // Make the API call
            await doubtApi(doubtsData);
            
            // Display toast message
            Toast.show({
                type: 'success',
                text1: 'Doubt sent Successful',
                text2: 'You have successfully send.',
            });
            return navigation.push('Home');
        } catch (error) {
            // doubt failed, show error message
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Doubt Failed',
                text2: 'Failed to doubt. Please try again.',
            });
        }
    };

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
                        {teacherInfo()}
                        {subjectInfo()}
                        {titleInfo()}
                        {descriptionInfo()}
                        {sendButton()}
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

    function subjectInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 7.0, ...Fonts.grayColor13Regular }}>
                    Select Subject
                </Text>
                <Menu
                    visible={showSubjectsMenu}
                    style={{ width: '89%', maxHeight: height - 100 }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { setShowSubjectsMenu(true) }}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Text style={{ flex: 1, ...selectedSubject ? { ...Fonts.blackColor14Medium } : { ...Fonts.grayColor14Regular } }}>
                                {selectedSubject ? selectedSubject : 'Select Subject'}
                            </Text>
                            <Feather name="chevron-down" size={22} color={Colors.primaryColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => setShowSubjectsMenu(false)}
                >
                    <ScrollView>
                        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding, }}>
                            {
                                subjectsList.map((item, index) => (
                                    <Text
                                        key={`${index}`}
                                        onPress={() => { setSelectedSubject(item), setShowSubjectsMenu(false) }}
                                        style={{ ...Fonts.primaryColor14Medium, marginVertical: Sizes.fixPadding, }}
                                    >
                                        {item}
                                    </Text>
                                ))
                            }
                        </View>
                    </ScrollView>
                </Menu>
                <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginTop: Sizes.fixPadding - 5.0, }} />
            </View>
        )
    }

    function teacherInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 7.0, ...Fonts.grayColor13Regular }}>
                    Select Teacher
                </Text>
                <Menu
                    visible={showTeachersMenu}
                    style={{ width: '89%', maxHeight: height - 100 }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { setShowTeachersMenu(true) }}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Text style={{ flex: 1, ...selectedTeacher ? { ...Fonts.blackColor14Medium } : { ...Fonts.grayColor14Regular } }}>
                                {selectedTeacher ? selectedTeacher : 'Select Teacher'}
                            </Text>
                            <Feather name="chevron-down" size={22} color={Colors.primaryColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => setShowTeachersMenu(false)}
                >
                    <ScrollView>
                        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding, }}>
                            {
                                teachersList.map((item, index) => (
                                    <Text
                                        key={`${index}`}
                                        onPress={() => { setSelectedTeacher(item), setShowTeachersMenu(false) }}
                                        style={{ ...Fonts.primaryColor14Medium, marginVertical: Sizes.fixPadding, }}
                                    >
                                        {item}
                                    </Text>
                                ))
                            }
                        </View>
                    </ScrollView>
                </Menu>
                <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginTop: Sizes.fixPadding - 5.0, }} />
            </View>
        )
    }

    function sendButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDoubt}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Send
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
                    placeholder='Ex. What is the senario...'
                    value={description}
                    onChangeText={(value) => { setDescription(value) }}
                    cursorColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function titleInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor13Regular }}>
                    Title
                </Text>
                <TextInput
                    placeholder='Ex. Statistics for Economics'
                    value={title}
                    onChangeText={(value) => { setTitle(value) }}
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
                    Ask Doubts
                </Text>
            </View>
        )
    }
}

export default AskDoubtsScreen

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
    buttonStyle: {
        backgroundColor: Colors.secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 3.0,
        elevation: 1.0,
        shadowColor: Colors.secondaryColor,
        borderColor: '#FFAB1B95',
        borderWidth: 1.0,
    }
})