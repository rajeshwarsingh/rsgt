import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getQuestionsApi } from '../../api/index'

const totalExamMinute = 30;

const TestStartScreen = ({ navigation }) => {


    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(totalExamMinute);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestionsApi();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (second > 0) {
                setSecond(second - 1)
            }
            else {
                if (second == 0 && minute !== 0) {
                    setMinute(minute - 1)
                    minute - 1 !== 0 ? setSecond(59) : null;
                }
                else {
                    setMinute(0)
                }
            }
        }, 1000);
        return () => {
            clearTimeout()
        }
    }, [second,]);

    if (questions?.length <= 0) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    } else {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <ImageBackground
                    source={require('../../assets/images/bgImage.png')}
                    style={{ width: '100%', height: 250, flex: 1, }}
                    resizeMode="stretch"
                >
                    <View style={{ flex: 1, }}>
                        {header()}
                        {timingInfo()}
                        {questionNumberInfo()}
                        <ScrollView contentContainerStyle={{ paddingTop: Sizes.fixPadding * 3.0, paddingBottom: Sizes.fixPadding * 6.0, }}>
                            {questionInfo()}
                        </ScrollView>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }

    function updateQuestions({ id, userAnswer }) {
        const copyQuestions = questions;
        const newQuestions = copyQuestions.map((item) => {
            if (item.id == id) {
                return { ...item, userAnswer: userAnswer }
            }
            else {
                return item
            }
        });
        setQuestions(newQuestions);
    }

    // function stylingSort({ item }) {
    //     return questions[selectedQuestionIndex].userAnswer
    //         ?
    //         (questions[selectedQuestionIndex].userAnswer == questions[selectedQuestionIndex].correctAnswer)
    //             ?
    //             questions[selectedQuestionIndex].userAnswer == item
    //                 ?
    //                 Colors.darkGreenColor
    //                 :
    //                 Colors.lightGrayColor
    //             :
    //             questions[selectedQuestionIndex].userAnswer == item
    //                 ?
    //                 Colors.redColor
    //                 :
    //                 questions[selectedQuestionIndex].correctAnswer == item
    //                     ?
    //                     Colors.darkGreenColor
    //                     :
    //                     Colors.lightGrayColor
    //         :
    //         Colors.lightGrayColor
    // }
    function stylingSort({ item }) {
        return questions[selectedQuestionIndex].userAnswer == item
        ?
        Colors.grayColor
        :
        Colors.lightGrayColor
    }

    function questionInfo() {
        return (
            <View>
                <View style={{ bottom: -40.0, marginHorizontal: Sizes.fixPadding * 6.0, ...styles.paperLayerStyle }} />
                <View style={{ marginHorizontal: Sizes.fixPadding * 4.0, bottom: -20.0, ...styles.paperLayerStyle, }} />
                <View style={styles.questionInfoWrapStyle}>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, ...Fonts.blackColor17Medium }}>
                        {questions[selectedQuestionIndex].question}
                    </Text>
                    {
                        questions[selectedQuestionIndex].options.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    // questions[selectedQuestionIndex].userAnswer
                                    //     ?
                                    //     null
                                    //     :
                                        updateQuestions({ id: questions[selectedQuestionIndex].id, userAnswer: item })
                                }}
                                key={`${index}`}
                                style={{
                                    borderColor: stylingSort({ item: item }),
                                    backgroundColor: stylingSort({ item: item }) == Colors.lightGrayColor ? Colors.whiteColor : stylingSort({ item: item }) == Colors.darkGreenColor ? '#6AC25915' : '#E9202015',
                                    borderWidth: stylingSort({ item: item }) !== Colors.lightGrayColor ? 1.5 : 1.0,
                                    ...styles.optionsWrapStyle,
                                }}
                            >
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text
                                        style={{
                                            fontSize: 15.0,
                                            fontFamily: stylingSort({ item: item }) == Colors.lightGrayColor ? 'Inter_Regular' : 'Inter_SemiBold',
                                            color: stylingSort({ item: item }) == Colors.lightGrayColor ? Colors.grayColor : stylingSort({ item: item })
                                        }}
                                    >
                                        {index == 0 ? 'A.' : index == 1 ? 'B.' : index == 2 ? 'C.' : 'D.'}
                                    </Text>
                                    <Text
                                        style={{
                                            flex: 1, fontSize: 15.0, marginLeft: Sizes.fixPadding - 5.0,
                                            fontFamily: stylingSort({ item: item }) == Colors.lightGrayColor ? 'Inter_Regular' : 'Inter_SemiBold',
                                            color: stylingSort({ item: item }) == Colors.lightGrayColor ? Colors.grayColor : stylingSort({ item: item })
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </View>
                                {
                                    stylingSort({ item: item }) == Colors.lightGrayColor
                                        ?
                                        <View style={styles.notSelectedOptionIndicatorStyle} />
                                        :
                                        stylingSort({ item: item }) == Colors.redColor
                                            ?
                                            <MaterialCommunityIcons name="close-circle" size={20} color={Colors.redColor} />
                                            :
                                            <MaterialCommunityIcons name="check-circle" size={20} color={'blue'} />
                                }
                            </TouchableOpacity>
                        ))
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {(selectedQuestionIndex <= 0) && <TouchableOpacity style={styles.previousAndViewScoreStyle}><Text></Text></TouchableOpacity>}
                    {(selectedQuestionIndex > 0) && <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { selectedQuestionIndex == questions.length - 1 ? navigation.push('TestResult',{questions}) : setSelectedQuestionIndex(selectedQuestionIndex - 1) }}
                        style={styles.previousAndViewScoreStyle}
                    >
                        <MaterialIcons
                            name='arrow-back'
                            color={Colors.secondaryColor}
                            size={22}
                            style={{ marginLeft: Sizes.fixPadding }}
                        />
                        <Text style={{ ...Fonts.secondaryColor16SemiBold }}>
                        Previous
                        </Text>
                        
                    </TouchableOpacity>}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { selectedQuestionIndex == questions.length - 1 ? navigation.push('TestResult',{questions}) : setSelectedQuestionIndex(selectedQuestionIndex + 1) }}
                        style={styles.nextAndViewScoreStyle}
                    >
                        <Text style={{ ...Fonts.secondaryColor16SemiBold }}>
                            {selectedQuestionIndex == questions.length - 1 ? 'View Score' : 'Next'}
                        </Text>
                        <MaterialIcons
                            name='arrow-forward'
                            color={Colors.secondaryColor}
                            size={22}
                            style={{ marginLeft: Sizes.fixPadding }}
                        />
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    function questionNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 3.0, ...Fonts.whiteColor20Medium }}>
                    Question {selectedQuestionIndex + 1}
                    <Text style={{ ...Fonts.whiteColor13Regular }}>
                        { } /{questions.length}
                    </Text>
                </Text>
                <View style={{ borderColor: Colors.lightGrayColor, borderStyle: 'dashed', borderWidth: 1.0, }} />
            </View>
        )
    }

    function timingInfo() {
        var displayMinute = minute.toString().length == 1 ? `0${minute}` : minute;
        var displaySecond = second.toString().length == 1 ? `0${second}` : second
        return (
            <View style={styles.progressIndicatorWrapStyle}>
                <View style={{ flex: (minute / totalExamMinute), ...styles.timingIndicatorStyle, }} />
                <Text style={styles.timingTextStyle}>
                    {displayMinute}:{displaySecond} {minute == 0 ? 'sec' : 'min'}
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} onPress={() => { navigation.pop() }} />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18SemiBold }}>
                    Economics Test
                </Text>
            </View>
        )
    }
}

export default TestStartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerWrapStyle: {
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timingTextStyle: {
        position: 'absolute',
        padding: Sizes.fixPadding,
        ...Fonts.whiteColor14Medium,
        transform: [{ rotate: '180deg' }],
        alignSelf: 'center',
    },
    timingIndicatorStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.darkPrimaryColor,
        alignItems: 'stretch',
    },
    progressIndicatorWrapStyle: {
        backgroundColor: Colors.secondaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        borderWidth: 2.0,
        borderColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 38.0,
        flexDirection: 'row',
        overflow: 'hidden',
        transform: [{ rotate: '-180deg' }]
    },
    paperLayerStyle: {
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        height: '100%',
        borderRadius: Sizes.fixPadding * 3.4,
        backgroundColor: '#CED7D9',
        elevation: 3.0,
    },
    nextAndViewScoreStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: Sizes.fixPadding + 5.0,
    },
    previousAndViewScoreStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: Sizes.fixPadding + 5.0,
    },
    questionInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding * 3.4,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.5,
        elevation: 3.0,
    },
    optionsWrapStyle: {
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    notSelectedOptionIndicatorStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
    }
})