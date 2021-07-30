import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import appTheme from "../constants/theme";

export default function IngredientItem({ item, image }) {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          tint="light"
          preview={{ image }}
          uri={image}
        />
      </View>

      <View style={styles.name}>
        <Text style={{ ...appTheme.FONTS.body3 }}>{item.ingredient.name}</Text>
      </View>

      <View style={styles.quantity}>
        <Text style={{ ...appTheme.FONTS.body3 }}>
          {item.quantity} {item.unit.name}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: appTheme.COLORS.lightGray,
  },
  image: {
    height: 40,
    width: 40,
  },
  name: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  quantity: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
