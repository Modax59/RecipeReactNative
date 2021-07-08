import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.HOMEPAGE} component={HomeScreen} />
    <Stack.Screen
      name={routes.LISTING_DETAILS}
      component={ListingDetailsScreen}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
