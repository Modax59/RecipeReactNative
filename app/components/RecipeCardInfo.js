import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import appTheme from "../constants/theme";
import RecipeCardDetails from "./RecipeCardDetails";

export default function RecipeCardInfo({ recipeItem }) {
  return (
    <BlurView intensity={90} tint="dark" style={styles.view}>
      <RecipeCardDetails recipeItem={recipeItem} />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  view: {
    overflow: "hidden",
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: appTheme.SIZES.radius,
    paddingHorizontal: appTheme.SIZES.base,
    borderRadius: appTheme.SIZES.radius,
  },
});
