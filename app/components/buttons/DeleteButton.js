import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import appTheme from "../../constants/theme";

export default function DeleteButton({ onPress, value = "X" }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    textAlign: "center",
    color: "#e74c3c",
    ...appTheme.FONTS.h3,
  },
});
