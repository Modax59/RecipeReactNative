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
import HomeNavigator from "./HomeNavigator";
import ListingMyRecipesScreen from "../screens/ListingMyRecipesScreen";
import NewListingButton from "./NewListingButton";

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
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="home" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.LISTINGS}
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="magnify" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecipeCreate"
        component={RecipeCreateScreen}
        options={({ navigation, focused }) => ({
          tabBarButton: () => (
            <NewListingButton
              focus={focused}
              onPress={() => navigation.navigate(routes.CREATE_RECIPE)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name={routes.LISTING_MY_RECIPES}
        component={ListingMyRecipesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="bookmark" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
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

 */
