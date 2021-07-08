import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

export default function ButtonWoFeedBack({ text, color }) {
  return (
    <TouchableWithoutFeedback>
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
