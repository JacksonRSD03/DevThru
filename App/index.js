import "react-native-gesture-handler";
import React from "react";

import Routes from "../App/screens/routes/Routes";
import { AuthProvider } from "./context/auth";

export default function App() {
  return (
    <AuthProvider>
      <Routes />;
    </AuthProvider>
  );
}
