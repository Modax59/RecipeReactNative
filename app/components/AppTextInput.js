import React from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import appTheme from "../constants/theme";
import { useTheme } from "@react-navigation/native";

function AppTextInput({ icon, width = "100%", styleContainer, ...otherProps }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { width, backgroundColor: colors.secondBackground },
        styleContainer,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.meduim}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.meduim}
        style={[defaultStyles.text, { color: colors.primary }]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: appTheme.SIZES.radius,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    ...appTheme.SHADOW.base,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
