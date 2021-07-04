import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import colors from "../config/colors";
import Constants from "expo-constants";
import {useNetInfo} from "@react-native-community/netinfo";

function OfflineNotice(props) {
    const netInfo = useNetInfo();

    if(netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Aucune Connexion Internet</Text>
        </View>
    );
    return null;
}
const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        backgroundColor: colors.primary,
        height: 50,
        justifyContent: "center",
        position: 'absolute',
        zIndex: 1,
        top: Constants.statusBarHeight,
        width: '100%',
    },
    text:{
        color: colors.purWhite
    }
})

export default OfflineNotice;