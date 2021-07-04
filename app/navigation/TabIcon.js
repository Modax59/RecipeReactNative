import React from 'react';
import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../config/colors";

function TabIcon({focused, icon, size}) {
    return (
        <View style={{
            alignItems:"center", justifyContent: 'center', height: 80, width: 50
        }}>
            <MaterialCommunityIcons name={icon} color={focused ? colors.green : colors.test} size={size} />
            {focused &&
                <View style={{
                    position: "absolute",
                    left: 0,
                    bottom:0,
                    right:0,
                    height: 5,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    backgroundColor: colors.green
                }} />

            }
        </View>
    );
}

export default TabIcon;