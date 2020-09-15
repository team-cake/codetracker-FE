import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignUpConfScreen from "../screens/SignUpConfScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignUpConf" component={SignUpConfScreen} />
    </Stack.Navigator>
  );
}
