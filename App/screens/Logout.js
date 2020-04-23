import React, { Component, useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, AsyncStorage } from "react-native";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Logout({ navigation }) {
  /*  useEffect(() => {
    setTimeout(handleLogout, 3000);
  });*/
  async function handleLogout() {
    try {
      await AsyncStorage.clear();
      const auth = firebase.auth();
      await auth.signOut();
    } catch (error) {
      console.log("deu bosta na hora do logout, o erro foi: " + error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleLogout();
          () => {
            navigation.navigate("RootStack");
          };
        }}
      >
        <Text>...</Text>
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
