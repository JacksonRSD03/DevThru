import React from "react";
import { AsyncStorage } from "react-native";
import Main from "./auth.routes";
import Drawer from "./drawer.routes";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}
export default App;