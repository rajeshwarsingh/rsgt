import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, Image, TouchableOpacity, FlatList, } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';

import { getFaculty, getSubjects } from '../../api/index';

const FacultiesScreen = ({ navigation }) => {

    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);

    const [facultiesList, setFacultiesList] = useState([]);
    const [subjectsList, setSubjectsList] = useState([]);

    useEffect(() => {
        const fetchSM = async () => {
            try {

                const data = await getFaculty();
                // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",data);
                const dataFacultyList = data;
                console.log("dataFacultyList :", dataFacultyList);
                setFacultiesList(dataFacultyList);
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
                const dataSubjectList = data.map(subject => subject.name);
                console.log("dataSubjectList :", dataSubjectList);
                setSubjectsList(dataSubjectList);
            } catch (error) {
                console.error('Error fetching SM:', error);
            }
        };

        fetchSM();
    }, []);


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
                    {subjects()}
                    {facultiesInfo()}
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

    function facultiesInfo() {
        const displayFaculties = facultiesList.filter((item) => item.subjectsKnown.includes(subjectsList[selectedSubjectIndex]));
        const renderItem = ({ item }) => (
            <View style={styles.infoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor15Medium }}>
                            {item.facultyName}
                        </Text>
                        <Text numberOfLines={3} style={{ marginTop: Sizes.fixPadding - 6.0, ...Fonts.grayColor13Regular }}>
                            {item.description}
                        </Text>
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                        <Image
                            source={{ uri: item.facultyImage}}
                            style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                        />
                        {/* <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { navigation.push('ChatWithFaculty') }}
                            style={styles.chatBoxStyle}
                        >
                            <MaterialIcons
                                name='message'
                                color={Colors.whiteColor}
                                size={10}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor10Bold }}>
                                Chat
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding + 5.0 }} />
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    {item.subjectsKnown.map(item => item).join(', ')}
                </Text>
            </View>
        )
        return (
            <FlatList
                data={displayFaculties.length == 0 ? facultiesList : displayFaculties}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function subjects() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedSubjectIndex(index)}
                style={{
                    backgroundColor: index == selectedSubjectIndex ? Colors.secondaryColor : 'transparent',
                    marginHorizontal: index == 0 || index == subjectsList.length - 1 ? 0.0 : Sizes.fixPadding - 5.0,
                    paddingHorizontal: index == selectedSubjectIndex ? Sizes.fixPadding + 10.0 : Sizes.fixPadding + 2.0,
                    ...styles.subjectWrapStyle,
                }}
            >
                <Text style={index == selectedSubjectIndex ? { ...Fonts.whiteColor13Medium } : { ...Fonts.blackColor13Medium }}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ ...styles.allSubjectsWrapStyle }}>
                <FlatList
                    data={subjectsList}
                    keyExtractor={(item, index) => `${item}${index}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} onPress={() => { navigation.pop() }} />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18SemiBold }}>
                    Faculties
                </Text>
            </View>
        )
    }
}

export default FacultiesScreen

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
    subjectWrapStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    allSubjectsWrapStyle: {
        borderColor: Colors.secondaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding * 2.0,
        margin: Sizes.fixPadding * 2.0,
        overflow: 'hidden'
    },
    infoWrapStyle: {
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding * 2.0,
    },
    chatBoxStyle: {
        marginTop: -15.0,
        flexDirection: 'row',
        backgroundColor: Colors.secondaryColor,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 7.0,
    }
})