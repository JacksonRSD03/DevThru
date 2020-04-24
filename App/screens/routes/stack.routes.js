import React from "react";
import { AsyncStorage } from "react-native";
import Login from "../Login";
import Main from "../Main";
import Drawer from "./drawer.routes";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const uid = AsyncStorage.getItem("@MySuperStore:key");
export default function MyStack() {
  console.log(uid);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={Drawer} />

      <Stack.Screen name="Main" component={uid ? Main : Login} />
    </Stack.Navigator>
  );
}
