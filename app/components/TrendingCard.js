import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import appTheme from "../constants/theme";
import RecipeCardInfo from "./RecipeCardInfo";

export default function TrendingCard({
  containerStyle,
  recipeItem,
  onPress,
  image,
}) {
  return (
    <TouchableOpacity
      style={(styles.container, { ...containerStyle })}
      onPress={onPress}
    >
      <Image
        style={{
          resizeMode: "cover",
          width: 215,
          height: 315,
          borderRadius: appTheme.SIZES.radius,
        }}
        tint="light"
        preview={{ image }}
        uri={image}
      />
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 15,
          paddingHorizontal: appTheme.SIZES.radius,
          paddingVertical: appTheme.SIZES.radius,
          backgroundColor: appTheme.COLORS.transparentGray,
          borderRadius: appTheme.SIZES.radius,
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontWeight: "bold",
            ...appTheme.FONTS.h4,
          }}
        >
          {recipeItem.category.name}
        </Text>
      </View>
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: 250,
    marginTop: appTheme.SIZES.radius,
    marginRight: 20,
    borderRadius: appTheme.SIZES.radius,
  },
});
