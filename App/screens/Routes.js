import React from "react";
import { StatusBar } from "react-native";
import Stack from "./routes/stack.routes";
import { NavigationContainer } from "@react-navigation/native";
export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={"#21CCC5"} />
      <Stack />
    </NavigationContainer>
  );
}
