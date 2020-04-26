import React from "react";
import Login from "../Login";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
export default Auth;
