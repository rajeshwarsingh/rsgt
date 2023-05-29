import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, FlatList } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';

const SyllabusDetailScreen = ({ navigation, route }) => {

    const syllabus = route.params.syllabus;

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
                    {syllabusDetail()}
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

    function syllabusDetail() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding * 2.0, ...Fonts.primaryColor18Medium }}>
                    Unit {index + 1}:- {item.chepterName}
                </Text>
                {
                    item.subTopics.map((subTopics, innerIndex) => (
                        <View style={{ marginBottom: Sizes.fixPadding * 2.0, }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ ...Fonts.blackColor15Medium }}>
                                    {index + 1}.{innerIndex + 1}
                                </Text>
                                <Text style={{ flex: 1, ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                                    {subTopics.subTopicTitle}
                                </Text>
                            </View>
                            {
                                subTopics.innerSubTopics.map((innerSubtopic, innerIndex2) => (
                                    <View>
                                        <View
                                            key={`${innerIndex2}`}
                                            style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, }}
                                        >
                                            <Text style={{ ...Fonts.grayColor13Regular, }}>
                                                •
                                            </Text>
                                            <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.grayColor13Regular, }}>
                                                {innerSubtopic.innerSubTopicTitle}
                                            </Text>
                                        </View>
                                        {
                                            innerSubtopic.extraInnerSubTopics
                                                ?
                                                innerSubtopic.extraInnerSubTopics.map((extraInnerSubTopic, innerIndex3) => (
                                                    <View key={`${innerIndex3}`}
                                                        style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 3.0, marginTop: Sizes.fixPadding }}
                                                    >
                                                        <Text style={{ ...Fonts.grayColor13Regular }}>
                                                            •
                                                        </Text>
                                                        <Text style={{ ...Fonts.grayColor13Regular, marginLeft: Sizes.fixPadding - 5.0, }}>
                                                            {extraInnerSubTopic.extraInnerSubTopicTitle}
                                                        </Text>
                                                    </View>
                                                ))
                                                :
                                                null
                                        }
                                    </View>
                                ))
                            }
                        </View>
                    ))
                }
            </View>
        )
        return (
            <FlatList
                data={syllabus.slice(0, 2)}
                keyExtractor={(item) => { `${item.id}` }}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} onPress={() => { navigation.pop() }} />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18SemiBold }}>
                    Syllabus
                </Text>
            </View>
        )
    }
}

export default SyllabusDetailScreen

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
})