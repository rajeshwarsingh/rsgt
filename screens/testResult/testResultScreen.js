import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { getProfile } from '../../utils/index';
import {BannerAds} from '../../components/AdMobComponent'

const { width } = Dimensions.get('window');

const TestResultScreen = ({ route, navigation }) => {
    const { questions = [] } = route.params;
    let correct = 0;
    let skipped = 0;
    let Wrong = 0;
    questions.map((question => {
        if (!question.userAnswer) {
            skipped++;
        };

        if(question.correctAnswer === question.userAnswer) {
            correct++;
        };

        if(question.correctAnswer !== question.userAnswer) {
            Wrong++;
        };
    }));

    const [profile, setProfile] = useState({});

    useEffect(() => {
        fetchProfile();
    }, [])

    async function fetchProfile() {
        const data = await getProfile();
        setProfile(data);
    }

    
    // const [correct, setCorrect] = useState()
    
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
                    {bottomImage()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {gradePercentageInfo()}
                        {greatMessage()}
                        {resultSort({ title: 'Correct Answers', result:  `${correct}(${((correct/questions.length)*100).toFixed(2)}%)`, borderColor: Colors.darkGreenColor })}
                        {resultSort({ title: 'Skipped Answers', result: `${skipped}(${((skipped/questions.length)*100).toFixed(2)}%)`, borderColor: Colors.secondaryColor })}
                        {resultSort({ title: 'Wrong Answers', result:  `${Wrong}(${((Wrong/questions.length)*100).toFixed(2)}%)`, borderColor: Colors.redColor })}
                        {instruction()}
                        {leaderBoardAndAnswerSheetButton()}
                        {showAds()}
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

    function showAds(){

        return <BannerAds/>
    }

    function leaderBoardAndAnswerSheetButton() {
        return (
            <View style={styles.leaderBoardAndAnswerSheetButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('Home') }}
                    style={{ backgroundColor: Colors.secondaryColor, ...styles.buttonStyle, }}
                >
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor17Bold }}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('AnswerSheet',{questions}) }}
                    style={{ backgroundColor: Colors.whiteColor, ...styles.buttonStyle }}
                >
                    <Text numberOfLines={1} style={{ ...Fonts.secondaryColor17Bold }}>
                        Answer Sheet
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function instruction() {
        return (
            <View style={styles.leaderBoardAndAnswerSheetButtonWrapStyle}>
                {/* <Text numberOfLines={1} >
                    Visit our branch to get goodies on reference.
                </Text> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('Support') }}
                    style={{ backgroundColor: Colors.secondaryColor, ...styles.buttonStyle, }}
                >
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor17Bold }}>
                        VisitUs and win 500Rs/Referal
                    </Text>
                </TouchableOpacity>
                {/* 
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('AnswerSheet',{questions}) }}
                    style={{ backgroundColor: Colors.whiteColor, ...styles.buttonStyle }}
                >
                    <Text numberOfLines={1} style={{ ...Fonts.secondaryColor17Bold }}>
                        Answer Sheet
                    </Text>
                </TouchableOpacity> */}
            </View>
        )
    }

    function bottomImage() {
        return (
            <Image
                source={require('../../assets/images/resultBg.png')}
                style={styles.bottomImageStyle}
            />
        )
    }

    function resultSort({ title, result, borderColor }) {
        return (
            <View style={{ borderColor: borderColor, ...styles.resultInfoWrapStyle }}>
                <Text style={{ flex: 1, ...Fonts.blackColor16Regular }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    {result}
                </Text>
            </View>
        )
    }

    function greatMessage() {
        return (
            <View style={{ alignItems: 'center', marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor15Medium }}>
                {promptGrade((correct/questions.length)*100)['message']}
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor30BebasRegular }}>
                {profile?.firstName} {profile?.lastName} !!
                </Text>
            </View>
        )
    }

    function gradePercentageInfo() {
        return (
            <ImageBackground
                source={require('../../assets/images/gradePercentangeCircle.png')}
                style={styles.gradeWithPercentageImageStyle}
            >
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor44BebasRegular }}>
                    {((correct/questions.length)*100).toFixed(2)}%
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor13SemiBold }}>
                    GRADE {promptGrade(((correct/questions.length)*100).toFixed(2))['grade']}
                </Text>
            </ImageBackground>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default TestResultScreen

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
    gradeWithPercentageImageStyle: {
        width: 136.0,
        height: 136.0,
        alignSelf: 'center',
        margin: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        borderColor: Colors.secondaryColor,
        borderWidth: 1.0,
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        elevation: 3.0, shadowColor: Colors.secondaryColor,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
    leaderBoardAndAnswerSheetButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding + 5.0,
    },
    bottomImageStyle: {
        height: width / 3.0,
        width: '100%',
        position: 'absolute',
        bottom: 0.0,
    },
    resultInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0,
        padding: Sizes.fixPadding + 5.0,
    }
})

function promptGrade(percentage) {
    let grade;
    let message;
  
    if (percentage >= 90) {
      grade = 'A';
      message = 'Excellent!';
    } else if (percentage >= 80) {
      grade = 'B';
      message = 'Good job!';
    } else if (percentage >= 70) {
      grade = 'C';
      message = 'Well done!';
    } else if (percentage >= 60) {
      grade = 'D';
      message = 'Keep improving!';
    } else {
      grade = 'F';
      message = 'You need to work harder!';
    }
  
    return { grade, message };
  }