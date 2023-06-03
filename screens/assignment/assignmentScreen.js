import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, FlatList, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import ManageDoc from '../../components/ManageDoc'
import { getStudyMaterialApi } from '../../api/index'

const AssignmentScreen = ({ navigation }) => {
    const [studyMaterial, setStudyMaterial] = useState([]);
    useEffect(() => {
        const fetchSM = async () => {
            try {
                
                const data = await getStudyMaterialApi('X');
                setStudyMaterial(data);
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
                    {assignmentsInfo()}
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

    function assignmentsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.assignmentWrapStyle}>
                <View style={styles.subjectWrapStyle}>
                    <Text style={{ ...Fonts.secondaryColor13SemiBold }}>
                        {item.subject}
                    </Text>
                </View>
                <View>
                    {/* <Text style={{ ...Fonts.secondaryColor13SemiBold }}> */}
                    <ManageDoc />
                    {/* </Text> */}
                </View>
                
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.blackColor14Medium }}>
                    {item.topicTitle}
                    {
                        item.note
                            ?
                            <Text style={{ ...Fonts.redColor14Medium }}>
                                { } {item.note}
                            </Text>
                            :
                            null
                    }
                </Text>
                <View style={{ marginVertical: Sizes.fixPadding, ...styles.rowAlignCenterSpaceBetween }}>
                    <Text style={{ flex: 1, ...Fonts.grayColor13Regular }}>
                        Uploaded Date
                    </Text>
                    <Text style={{ ...Fonts.blackColor13Medium }}>
                        {item.asssignDate}
                    </Text>
                </View>
                {/* <View style={styles.rowAlignCenterSpaceBetween}>
                    <Text style={{ flex: 1, ...Fonts.grayColor13Regular }}>
                        Last Submission Date
                    </Text>
                    <Text style={{ ...Fonts.blackColor13Medium }}>
                        {item.lastSubmissionDate}
                    </Text>
                </View> */}
            </View>
        )
        return (
            <FlatList
                data={studyMaterial}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} onPress={() => { navigation.pop() }} />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18SemiBold }}>
                    Assignment
                </Text>
            </View>
        )
    }
}

export default AssignmentScreen

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
    rowAlignCenterSpaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subjectWrapStyle: {
        backgroundColor: Colors.lightSecondaryColor,
        borderRadius: Sizes.fixPadding - 4.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        alignSelf: 'flex-start'
    },
    assignmentWrapStyle: {
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding + 5.0,
    }
})