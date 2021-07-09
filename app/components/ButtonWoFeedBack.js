import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

export default function ButtonWoFeedBack({ text, color, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text
        style={{
          color: color,
          fontSize: 14,
          fontWeight: "bold",
          textDecorationLine: "underline",
          textDecorationColor: color,
        }}
      >
        {text}
      </Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
