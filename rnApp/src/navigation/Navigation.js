import React from "react";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Receive from "../screens/Receive";
import Send from "../screens/Send";
import Profil from "../screens/Profil";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Profil">
        <Tab.Screen
          headerShown={true}
          options={{
            tabBarLabel: "Receive message",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="comment-eye"
                color={color}
                size={size}
              />
            ),
          }}
          name="Receive message"
          component={Receive}
        />

        <Tab.Screen
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="face-profile"
                color={color}
                size={size}
              />
            ),
          }}
          name="Profil"
          component={Profil}
        />

        <Tab.Screen
          options={{
            tabBarLabel: "Send message",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="comment"
                color={color}
                size={size}
              />
            ),
          }}
          name="Send message"
          component={Send}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
