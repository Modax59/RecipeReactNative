import React from "react";
import { StyleSheet, Text, View } from "react-native";
import appTheme from "../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RecipeCardDetails({ recipeItem }) {
  //If is check change icon
  return (
    <View style={styles.container}>
      <View style={styles.containerName}>
        <Text style={styles.name}>{recipeItem.name}</Text>
        <MaterialCommunityIcons
          style={styles.icon}
          name="bookmark-outline"
          size={25}
          color={appTheme.COLORS.darkGreen}
        />
      </View>
      <Text style={styles.duration}>
        {recipeItem.preparingTime} mins｜4 personnes
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerName: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    width: "70%",
    color: appTheme.COLORS.white,
    ...appTheme.FONTS.h3,
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginRight: appTheme.SIZES.base,
  },
  duration: {
    color: appTheme.COLORS.lightGray,
    ...appTheme.FONTS.body4,
  },
});
