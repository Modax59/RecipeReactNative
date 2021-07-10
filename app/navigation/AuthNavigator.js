import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { useTheme } from "@react-navigation/native";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.secondBackground,
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.secondBackground,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
