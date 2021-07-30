import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import routes from "./routes";
import ListingMyRecipesScreen from "../screens/ListingMyRecipesScreen";
import RecipeEditScreen from "../screens/RecipeEditScreen";
import IngredientScreen from "../screens/Recipe/IngredientScreen";
import StepScreen from "../screens/Recipe/StepScreen";

const Stack = createStackNavigator();

const RecipeNavigator = () => (
  <Stack.Navigator mode="card" screenOptions={{ headerShown: true }}>
    <Stack.Screen
      options={{ headerTitle: "Modifier la recette" }}
      name={routes.RECIPE_EDIT}
      component={RecipeEditScreen}
    />
    <Stack.Screen
      options={{ headerTitle: "Les ingredients" }}
      name={routes.RECIPE_INGREDIENT}
      component={IngredientScreen}
    />
    <Stack.Screen
      options={{ headerTitle: "Les étapes" }}
      name={routes.RECIPE_STEP}
      component={StepScreen}
    />
  </Stack.Navigator>
);

export default RecipeNavigator;
