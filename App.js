import React from "react";
import Home from "./views/Home";
import HeaderIcon from "./views/HeaderIcon";
import Menu from "./views/Menu";
import Log from "./views/Log";
import Settings from "./views/Settings";
import About from "./views/About";
import { Provider } from "react-redux";
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AdMobBanner } from "react-native-admob";

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

class Loader extends React.Component {
  render = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 10
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

class App extends React.Component {
  render = () => (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Navigation />
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-2503286195846087~1837763885"
          onAdFailedToLoad={error => console.log(error)}
        />
        <View style={styles.footer}>
          <Text style={{ color: "white" }}>610 Industries, LLC</Text>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 60,
    backgroundColor: "black",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
