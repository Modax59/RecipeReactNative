import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../config/colors";
import {Image} from "react-native-expo-image-cache";

function Card({ title, image, userName, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} tint="light" preview={{image}} uri={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.username}>{userName}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.purWhite,
    marginBottom: 20,
    overflow: "hidden",

  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    marginBottom: 7,
  },
  username: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default Card;
