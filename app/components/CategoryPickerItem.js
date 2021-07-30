import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";
import appTheme from "../constants/theme";
import Icon from "./Icon";

function CategoryPickerItem({ item, onPress }) {
  const imageUrl = "http://127.0.0.1:8000" + item.fileUrl;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{
            resizeMode: "cover",
            width: 80,
            height: 80,
            borderRadius: appTheme.SIZES.radius,
          }}
          tint="light"
          preview={{ imageUrl }}
          uri={imageUrl}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
export default CategoryPickerItem;
