import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LINK_STACK_REGISTER } from "./constantes";

const StackRegister = createStackNavigator();
// Stack for registration
// Display when the user is not connected
// Allow to create account are to login
// On success log, display the main app

export default function StackNavRegister() {
  let arrayScreen = LINK_STACK_REGISTER.list.map((link) => (
    <StackRegister.Screen
      name={link.name}
      component={link.Component}
      key={link.name}
    />
  ));

  arrayScreen.push(
    <StackRegister.Screen
      name={LINK_STACK_REGISTER.default.name}
      component={LINK_STACK_REGISTER.default.Component}
      key={LINK_STACK_REGISTER.default.name}
      options={{ headerShown: false }}
    />
  );

  return (
    <NavigationContainer>
      <StackRegister.Navigator
        initialRouteName={LINK_STACK_REGISTER.default.name}
      >
        {arrayScreen}
      </StackRegister.Navigator>
    </NavigationContainer>
  );
}
