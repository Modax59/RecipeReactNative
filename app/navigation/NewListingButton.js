import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import appTheme from "../constants/theme";

function NewListingButton({ onPress, focus }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: focus
              ? appTheme.COLORS.darkLime
              : appTheme.COLORS.lightGreen,
            borderColor: colors.background,
          },
        ]}
      >
        <MaterialCommunityIcons name="plus" color={colors.purWhite} size={40} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 10,
    bottom: 20,
    borderRadius: 30,
    height: 80,
    justifyContent: "center",
    width: 80,
    shadowOpacity: 0,
  },
});
export default NewListingButton;
