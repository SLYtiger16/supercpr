import React from "react";
import Home from "./views/Home";
import HeaderIcon from "./views/HeaderIcon";
import Menu from "./views/Menu";
import Log from "./views/Log";
import Settings from "./views/Settings";
import About from "./views/About";
import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducer from "./store/appReducer";
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";

const store = createStore(appReducer);

const navigationOptions = ({ navigation }) => ({
  headerTitle: "Super CPR",
  headerStyle: {
    backgroundColor: "#f44336"
  },
  headerTintColor: "#efe06e",
  headerTitleStyle: {
    fontWeight: "bold"
  },
  headerRight: <HeaderIcon navigationProps={navigation} />
});

const MainNavigator = createStackNavigator({
  Home: { screen: Home, navigationOptions: navigationOptions },
  About: { screen: About, navigationOptions: navigationOptions },
  Log: { screen: Log, navigationOptions: navigationOptions },
  Settings: { screen: Settings, navigationOptions: navigationOptions }
});

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: MainNavigator,
      drawerLabel: "Home"
    },
    Log: {
      screen: MainNavigator,
      drawerLabel: "Log"
    },
    Settings: {
      screen: MainNavigator,
      drawerLabel: "Settings"
    },
    About: {
      screen: MainNavigator,
      drawerLabel: "About"
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: Menu,
    drawerWidth: 250
  }
);

const Navigation = createAppContainer(DrawerNavigator);

class App extends React.Component {
  render = () => (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
