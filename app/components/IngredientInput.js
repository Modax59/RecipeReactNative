import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@react-navigation/native";
import appTheme from "../constants/theme";

function ImageInput({ infos, onChange }) {
  const [infos, setInput] = useState({ id: "", name: "", quantity: "" });

  const { colors } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.secondBackground }]}
    >
      <AppPicker
        numberOfColumns={3}
        items={getCategoryApi.data}
        name="category"
        placeholder="Ingredient"
        width="50%"
        onSelectItem={(item) =>
          setInput(...input, { id: item.id, name: item.names })
        }
        PickerItemComponent={CategoryPickerItem}
      />
      <TextInput
        placeholder={"Enter Name"}
        value={input.value}
        onChangeText={(text) => setInput(...input, { quantity: text })}
      />
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: "red", fontSize: 13 }}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});
export default ImageInput;
