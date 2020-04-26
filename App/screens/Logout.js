import React, { Component, useEffect, useState } from "react";
import {TouchableOpacity, View, Button, Text, StyleSheet, AsyncStorage } from "react-native";
import firebase from "firebase";

export default function Logout({ navigation }) {
  /*  useEffect(() => {
    setTimeout(handleLogout, 3000);
  });*/

  async function handleLogout() {
    try {
      await AsyncStorage.clear();
      const auth = firebase.auth();
      await auth.signOut();
      navigation.navigate("Main", {
        screen: "Login",
      });
    } catch (error) {
      console.log("deu bosta na hora do logout, o erro foi: " + error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 100,
    height: 40,
  },
});
