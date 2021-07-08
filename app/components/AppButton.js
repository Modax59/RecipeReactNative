import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import appTheme from "../constants/theme";

function AppButton({
  title,
  onPress,
  color = "primary",
  buttonContainerStyle,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{
          x: 0,
          y: 0,
        }}
        end={{ x: 1, y: 0 }}
        colors={color}
        style={{
          ...buttonContainerStyle,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            textAlign: "center",
            color:
              color.length > 0
                ? appTheme.COLORS.white
                : appTheme.COLORS.lightGreen,
            ...appTheme.FONTS.h3,
          }}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default AppButton;
