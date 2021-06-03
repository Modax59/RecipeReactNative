import React from "react";
import {Image, StyleSheet, View} from "react-native";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function ViewImageScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}>
                <MaterialCommunityIcons name="close" color="white" size={25}/>
            </View>
            <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../assets/recipe1.jpg")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    closeIcon: {
        position: "absolute",
        top: 60,
        left: 20,
    },
    container: {
        backgroundColor: colors.black,
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default ViewImageScreen;
