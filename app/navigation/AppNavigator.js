import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeCreateScreen from "../screens/add/RecipeCreateScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import TabIcon from "./TabIcon";
import HomeScreen from "../screens/HomeScreen";
import appTheme from "../constants/theme";
import { useTheme } from "@react-navigation/native";
import routes from "./routes";
import ListingScreen from "../screens/ListingScreen";

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
        name={routes.HOMEPAGE}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="home" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.CREATE_RECIPE}
        component={RecipeCreateScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="book-plus" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="bookmark" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.LISTINGS}
        component={ListingScreen}
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
