import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const SearchBar = ({ onChange }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        marginHorizontal: 20,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: colors.secondBackground,
      }}
    >
      <MaterialCommunityIcons name="magnify" size={20} color="#777777" />
      <TextInput
        style={{
          marginLeft: 12,
          fontSize: 16,
          lineHeight: 22,
          color: colors.primary,
        }}
        onChangeText={onChange}
        placeholderTextColor="#777777"
        placeholder="Search Recipes"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchBar;
