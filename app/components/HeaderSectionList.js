import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import appTheme from "../constants/theme";

export default function HeaderSectionList({ name, datas }) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.name, { color: colors.primary }]}>{name}</Text>
      <Text style={styles.element}>{datas?.length} éléments</Text>
      <Button
        title="Voir"
        onPress={() => console.log("hey")}
        style={styles.element}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: appTheme.SIZES.radius,
    marginBottom: appTheme.SIZES.padding,
  },
  name: {
    flex: 1,
    ...appTheme.FONTS.h3,
    fontWeight: "600",
  },
  element: {
    color: appTheme.COLORS.lightGray2,
    ...appTheme.FONTS.body4,
  },
});
