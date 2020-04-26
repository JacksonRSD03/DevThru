import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import firebase from "firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@RNAuth:user");

      if (storageUser) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  function signIn() {
    const response = `${firebase.auth().currentUser.uid}`;
    console.log(response);
    setUser(response);

    AsyncStorage.setItem("@RNAuth:user", response);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
