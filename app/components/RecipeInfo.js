import React from "react";
import { StyleSheet, Text, View } from "react-native";
import appTheme from "../constants/theme";

export default function RecipeInfo({ recipe }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.infos}>
          {recipe.preparingTime} min | 4 personnes
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 130,
    width: appTheme.SIZES.width,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
  },
  textContainer: {
    flex: 1.5,
    justifyContent: "center",
  },
  infos: {
    marginTop: 5,
    color: appTheme.COLORS.lightGray2,
    ...appTheme.FONTS.body4,
  },
  name: {
    ...appTheme.FONTS.h2,
    fontWeight: "600",
  },
});
