import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import appTheme from "../constants/theme";
import { useTheme } from "@react-navigation/native";

export default function RecipeLineSection({ name, datas, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={[styles.number]}>{datas?.length}</Text>
      <Text style={[styles.name]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,

    elevation: 8,
    width: 150,
    backgroundColor: appTheme.COLORS.darkGreen,
    marginTop: appTheme.SIZES.radius,
    marginBottom: appTheme.SIZES.padding,
    borderRadius: appTheme.SIZES.font,
    padding: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: appTheme.COLORS.gray4,
    textAlign: "center",
  },
  number: {
    fontSize: 28,
    fontWeight: "700",
    color: appTheme.COLORS.gray4,
    textAlign: "center",
  },
  element: {
    color: appTheme.COLORS.white,
    ...appTheme.FONTS.body3,
  },
});
