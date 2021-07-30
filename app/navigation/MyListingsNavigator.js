import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import routes from "./routes";
import ListingMyRecipesScreen from "../screens/ListingMyRecipesScreen";
import RecipeEditScreen from "../screens/RecipeEditScreen";
import RecipeNavigator from "./RecipeNavigator";

const Stack = createStackNavigator();

const MyListingsNavigator = () => (
  <Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={routes.LISTING_MY_RECIPES}
      component={ListingMyRecipesScreen}
    />
    <Stack.Screen name={routes.RECIPE_EDIT} component={RecipeNavigator} />
  </Stack.Navigator>
);

export default MyListingsNavigator;
