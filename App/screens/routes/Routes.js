import React, { useContext } from "react";
import { StatusBar } from "react-native";
import App from "./stack.routes";
import Auth from "./auth.routes";

import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";

const Routes = () => {
  const { state } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={"#21CCC5"} />
      {state.user ? <App /> : <Auth />}
    </NavigationContainer>
  );
};
export default Routes;
