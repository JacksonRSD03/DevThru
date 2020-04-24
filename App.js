import React, { Component, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, AsyncStorage } from "react-native";
import Main from "./App/screens/Routes";
import Login from "./App/screens/Login";
import firebase from "firebase";

export default function App({ navigation }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    //initial
    getUserId();
  });

  async function getUserId() {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");

      setUser(value);
      if (value !== null) {
      } else if (value == null) {
        //navigation.navigate("Login");
        console.log("valor retornou nulo");
      }
    } catch (error) {
      console.log("Deu bosta na hora de salvar, aconteceu isso: " + error);
    }
  }
  console.log(user);
  return (
    <SafeAreaView style={styles.container}>
      {user ? <Main /> : <Login />}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF8",
    paddingTop: 35,
  },
  scrollview: {
    flex: 1,
    marginTop: 10,
  },
});
