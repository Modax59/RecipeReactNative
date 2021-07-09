import React, { useEffect } from "react";
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

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("Vous devez accepté la permission");
    }
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Supprimer", "Etes vous sur de vouloir supprimer l'image ?", [
        { text: "Oui", onPress: () => onChangeImage(null) },
        { text: "Non" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Erreur lors de lecture de image", error);
    }
  };
  const { colors } = useTheme();
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[styles.container, { backgroundColor: colors.secondBackground }]}
      >
        {!imageUri && (
          <MaterialCommunityIcons
            color={appTheme.COLORS.gray}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    width: 100,
    ...appTheme.SHADOW.base,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
export default ImageInput;
