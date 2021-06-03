import React, {useState} from "react";
import {Button, FlatList, Modal, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import defaultStyles from "../config/styles"
import Screen from "./Screen";
import PickerItem from "./PickerItem";

function AppPicker({icon, items, onSelectItem, selectedItem, placeholder}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={20}
                            color={defaultStyles.colors.meduim}
                            style={styles.icon}
                        />
                    )}
                    <Text style={styles.text}>
                        {selectedItem ? selectedItem.label : placeholder}
                    </Text>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={20}
                        color={defaultStyles.colors.meduim}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <Button title="Close" onPress={() => setModalVisible(false)}/>
                    <FlatList data={items} keyExtractor={item => item.value.toString()}
                              renderItem={({item}) => <PickerItem label={item.label}
                                                                  onPress={() => {
                                                                      setModalVisible(false);
                                                                      onSelectItem(item);
                                                                  }}/>}/>
                </Screen>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        flex: 1
    }
})

export default AppPicker;