import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../config/colors";

function AppButton({title, onPress, color = "primary"}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                style={[styles.button]}
                colors={[colors.green, "#48d79e"]}
                start={[0, 1]}
                end={[1, 0]}
            >
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        //backgroundColor: colors.primary,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        width: "100%",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.green,
    },
    text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default AppButton;
