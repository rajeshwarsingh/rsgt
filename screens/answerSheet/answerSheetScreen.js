import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// let resultsList = [];

const AnswerSheetScreen = ({ route, navigation  }) => {
    const { questions = [] } = route.params;
    const resultsList=questions;
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
                    {answersWithResult()}
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

    function stylingShort({ item, option }) {
        return item.userAnswer == item.correctAnswer
            ?
            item.userAnswer == option
                ?
                Colors.darkGreenColor
                :
                Colors.lightGrayColor
            :
            item.userAnswer == option
                ?
                Colors.redColor
                :
                item.correctAnswer == option
                    ?
                    Colors.darkGreenColor
                    :
                    Colors.lightGrayColor
    }

    function answersWithResult() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <Text style={{ ...Fonts.blackColor15Medium }}>
                                {index + 1}. { }
                            </Text>
                            <Text style={{ flex: 1, ...Fonts.blackColor15Medium }}>
                                {item.question}
                                {
                                    item.userAnswer
                                        ?
                                        null
                                        :
                                        <Text style={{ ...Fonts.secondaryColor15SemiBold }}>
                                            { } (Skipped)
                                        </Text>
                                }
                            </Text>
                        </View>
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor15Medium }}>
                            {index + 1}/{resultsList.length}
                        </Text>
                    </View>
                    {item.options.map((option, innerIndex) => (
                        <View
                            key={`${innerIndex}`}
                            style={{
                                ...styles.optionsWrapStyle,
                                borderColor: stylingShort({ item: item, option: option }),
                                backgroundColor:
                                    stylingShort({ item: item, option: option }) == Colors.redColor
                                        ? '#E9202015' :
                                        stylingShort({ item: item, option: option }) == Colors.darkGreenColor
                                            ?
                                            '#6AC25915'
                                            :
                                            Colors.whiteColor
                            }}
                        >
                            <View style={{ flexDirection: 'row', flex: 1, }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: stylingShort({ item: item, option: option }) == Colors.lightGrayColor ? 'Inter_Regular' : 'Inter_SemiBold',
                                        color: stylingShort({ item: item, option: option }) == Colors.lightGrayColor ? Colors.grayColor : stylingShort({ item: item, option: option })
                                    }}
                                >
                                    {innerIndex == 0 ? 'A' : innerIndex == 1 ? 'B' : innerIndex == 2 ? 'C' : 'D'}. { }
                                </Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 15,
                                        fontFamily: stylingShort({ item: item, option: option }) == Colors.lightGrayColor ? 'Inter_Regular' : 'Inter_SemiBold',
                                        color: stylingShort({ item: item, option: option }) == Colors.lightGrayColor ? Colors.grayColor : stylingShort({ item: item, option: option })
                                    }}
                                >
                                    {option}
                                </Text>
                            </View>
                            {
                                stylingShort({ item: item, option: option }) == Colors.redColor
                                    ?
                                    <MaterialCommunityIcons name="close-circle" size={20} color={Colors.redColor} />
                                    :
                                    stylingShort({ item: item, option: option }) == Colors.darkGreenColor
                                        ?
                                        <MaterialCommunityIcons name="check-circle" size={20} color={Colors.darkGreenColor} />
                                        :
                                        <View style={styles.radioButtonStyle} />
                            }
                        </View>
                    ))}
                </View>
                {
                    index == resultsList.length - 1
                        ?
                        null
                        :
                        <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding * 3.0, }} />
                }
            </View>
        )
        return (
            <FlatList
                data={resultsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                ListFooterComponent={
                    <>
                        {markingInfo()}
                    </>
                }
            />
        )
    }

    function markingInfo() {
        return (
            <View style={styles.markingInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor40BebasRegular }}>
                    {resultsList.filter((item) => item.userAnswer == item.correctAnswer).length + 1}
                    <Text style={{ ...Fonts.grayColor40BebasRegular }}>/20</Text>
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} onPress={() => { navigation.pop() }} />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18SemiBold }}>
                    Answer Sheet
                </Text>
            </View>
        )
    }
}

export default AnswerSheetScreen

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
    optionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 7.0,
    },
    markingInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButtonStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
    }
})