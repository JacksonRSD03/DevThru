import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import firebase from "firebase";

export const AuthContext = createContext();

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

    setUser(response);

    AsyncStorage.setItem("@RNAuth:user", response);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  console.log(signed);
  return (
    <AuthContext.Provider
      value={{
        state: {
          user,
        },
        actions: { signIn, signOut },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
