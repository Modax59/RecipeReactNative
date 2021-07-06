import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeCreateScreen from "../screens/add/RecipeCreateScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import TabIcon from "./TabIcon";
import HomeScreen from "../screens/HomeScreen";
import appTheme from "../constants/theme";
import { useTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: colors.background,
          borderTopColor: appTheme.COLORS.transparent,
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="home" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecipeCreate"
        component={RecipeCreateScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="book-plus" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="bookmark" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Homepage"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="cog" focused={focused} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

/*
<Tab.Screen
      name="RecipeCreate"
      component={RecipeCreateScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
            onPress={() => navigation.navigate(routes.CREATE_RECIPE)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
 */
