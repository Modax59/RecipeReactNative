import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import appTheme from "../../constants/theme";
import ButtonWoFeedBack from "../ButtonWoFeedBack";
const CheckRecipes = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/recipe/recipe.png")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          You have 12 recipes that you haven't tried yet
        </Text>
        <ButtonWoFeedBack
          color={appTheme.COLORS.darkGreen}
          text="See Recipes"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: appTheme.COLORS.lightGreen,
    marginTop: appTheme.SIZES.padding,
  },
  image: {
    width: 90,
    height: 90,
  },
  textContainer: {
    marginHorizontal: 15,
    width: "55%",
  },
  text: {
    color: appTheme.COLORS.black,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
});

export default CheckRecipes;
