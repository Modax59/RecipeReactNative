import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import appTheme from "../../constants/theme";
import { useTheme } from "@react-navigation/native";

export default function CategoryHeader() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>Categories</Text>
      <TouchableOpacity>
        <Text style={styles.text}>View All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: appTheme.SIZES.padding,
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    ...appTheme.FONTS.h3,
  },
  text: {
    color: appTheme.COLORS.gray,
    ...appTheme.FONTS.body4,
  },
});
