import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Inter_Regular: require("../assets/fonts/Inter-Regular.ttf"),
                Inter_Medium: require("../assets/fonts/Inter-Medium.ttf"),
                Inter_SemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
                Inter_Bold: require("../assets/fonts/Inter-Bold.ttf"),
                Inter_ExtraBold: require("../assets/fonts/Inter-ExtraBold.ttf"),
                BebasNeue_Regular: require("../assets/fonts/BebasNeue-Regular.ttf"),
            });
            navigation.push('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;
