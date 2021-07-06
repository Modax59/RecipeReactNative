import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import appTheme from "../constants/theme";
import { useTheme } from "@react-navigation/native";

function HorizontalCard({ item, styleCard, onPress, image }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        borderRadius: appTheme.SIZES.radius,
        backgroundColor: colors.secondBackground,
        ...styleCard,
      }}
      onPress={onPress}
    >
      <Image
        style={{
          resizeMode: "cover",
          width: 100,
          height: 100,
          borderRadius: appTheme.SIZES.radius,
        }}
        tint="light"
        preview={{ image }}
        uri={image}
      />
      <View
        style={{
          width: "65%",
          paddingHorizontal: appTheme.SIZES.padding,
        }}
      >
        <Text
          style={{
            flex: 1,
            color: colors.primary,
            ...appTheme.FONTS.h2,
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            color: colors.secondary,
            ...appTheme.FONTS.body4,
          }}
        >
          {item.preparingTime} mins｜4 personnes
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default HorizontalCard;
