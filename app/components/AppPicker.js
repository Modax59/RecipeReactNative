import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import appTheme from "../constants/theme";
import { useTheme } from "@react-navigation/native";

function AppPicker({
  icon,
  items,
  numberOfColumns = 1,
  PickerItemComponent = PickerItem,
  onSelectItem,
  selectedItem,
  placeholder,
  textSize = 18,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View
          style={[
            styles.container,
            { width, backgroundColor: colors.secondBackground },
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
          {selectedItem ? (
            <Text
              style={[
                styles.text,
                { color: colors.primary, fontSize: textSize },
              ]}
            >
              {selectedItem.name ? selectedItem.name : selectedItem}
            </Text>
          ) : (
            <Text style={[styles.placeholder, { fontSize: textSize }]}>
              {placeholder}
            </Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.meduim}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            numColumns={numberOfColumns}
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.name}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
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
  placeholder: {
    color: defaultStyles.colors.meduim,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
