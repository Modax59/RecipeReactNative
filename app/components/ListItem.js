import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItem({
  title,
  subtitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight
        style={styles.touch}
        underlayColor={colors.light}
        onPress={onPress}
      >
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={2}>
                {subtitle}
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            color={colors.meduim}
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  touch: {
    flexBasis: 100,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 3,
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
    fontSize: 14,
    paddingBottom: 5,
  },
  subtitle: {
    color: colors.meduim,
    fontSize: 12,
  },
});

export default ListItem;
