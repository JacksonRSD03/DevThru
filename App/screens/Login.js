import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { StatusBar } from "react-native";
import firebase from "firebase";
import { AuthContext } from "../context/auth";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const Login = React.useContext(AuthContext);
 
  async function onlogin() {
    const auth = firebase.auth();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      Login.signIn();
    } catch (error) {
      setErrorMessage("Email e/ou Senha inválida!");
    }
  }

  return (
    <View style={styles.view}>
      <StatusBar barStyle="light-content" backgroundColor={"#21CCC5"} />

      <View style={styles.loginBox}>
        <View style={styles.positionInput}>
          <TextInput
            style={styles.loginInput}
            placeholder="   Email"
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.loginInput}
            placeholder="  Senha"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.positionButton}>
          <TouchableOpacity style={styles.buttonLogin} onPress={onlogin}>
            <Text style={styles.textbutton}>Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#21CCC5",
  },
  loginBox: {
    width: "90%",
    height: "50%",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    backgroundColor: "#FFF",
  },
  loginInput: {
    height: 40,
    borderRadius: 10,
    fontSize: 18,
    margin: 5,
    backgroundColor: "#FFF",
    marginEnd: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  error: { color: "red" },
  textbutton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonLogin: {
    backgroundColor: "#21CCC5",
    width: 300,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 10,
  },
  positionInput: {
    justifyContent: "center",
    paddingTop: 70,
  },
  positionButton: {
    justifyContent: "flex-end",
    paddingTop: 80,
  },
});
