import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../config/colors";

function AppButtonEmpty({title, onPress, border = "primary"}) {
    return (
        <TouchableOpacity
            style={[styles.button, {borderColor: colors.green}]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "transparent",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        width: "100%",
        marginVertical: 10,
        borderWidth: 1,
    },
    text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default AppButtonEmpty;
