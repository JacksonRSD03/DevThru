import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AsyncStorage } from "react-native";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home from "./Main";
import Logout from "./Logout";
import { StatusBar } from "react-native";


const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={Login}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);
/*const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: Main,
      }}
    />
  </HomeStack.Navigator>
);*/
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Logout" component={Logout} />
  </Drawer.Navigator>
);
const RootStack = createStackNavigator();
const RootStackScreen = ({ uid }) => (
  <RootStack.Navigator headerMode="none">
    {uid ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);
export default () => {
  const uid = AsyncStorage.getItem("@MySuperStore:key");
  console.log(uid);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={"#21CCC5"} />
      <RootStackScreen uid={uid} />
    </NavigationContainer>
  );
};
