import React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View,} from "react-native";
import colors from "../config/colors";

function ListIngredients({name, unit, image, onPress}) {
    return (
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
            <View style={styles.container}>
                <Image style={styles.image} source={image}/>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.quantity}>{unit}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 35,
        marginRight: 3,
        flexBasis: 40,
    },
    title: {
        fontWeight: "500",
        fontSize: 18,
        flexBasis: 240,
        textAlign: "left",
        paddingLeft: 20,
        color: colors.black_blue,
    },
    subtitle: {
        color: colors.meduim,
        fontSize: 12,
    },
    quantity: {
        fontWeight: "400",
        flexBasis: 50,
    },
});

export default ListIngredients;
