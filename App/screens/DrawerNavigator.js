import { createDrawerNavigator } from "react-navigation-drawer";

import Main from "./Main";
import Logout from "./Logout";
const BottomTabNavigator = createDrawerNavigator({
  Main: {
    screen: Main,
    navigationOptions: { title: "Main" },
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      title: "Logout",
    },
  },
});

export default BottomTabNavigator;
