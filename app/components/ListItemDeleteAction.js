import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function ListItemDeleteAction({onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons name="trash-can" size={25} color="white"/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.red,
        width: 70,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ListItemDeleteAction;