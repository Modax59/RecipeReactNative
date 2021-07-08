import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

const Header = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.title}>Hello Clément</Text>
        <Text
          style={{
            marginTop: 3,
            fontSize: 16,
            lineHeight: 22,
            color: colors.primary,
          }}
        >
          What you want to cook today?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    height: 80,
  },
  title: {
    color: "#229879",
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 30,
  },
});

export default Header;
