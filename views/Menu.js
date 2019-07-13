import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import menuHead from "../assets/img/menuHead.png";
import Icon from "react-native-vector-icons/MaterialIcons";

class HR extends React.Component {
  render = () => <View style={{ width: "100%", height: 1, backgroundColor: "#e2e2e2", marginTop: 15 }} />;
}

class Menu extends React.Component {
  _onPressButton = () => this.props.navigationProps.toggleDrawer();
  render = () => {
    return (
      <View style={styles.sideMenuContainer}>
        <Image source={menuHead} style={styles.sideMenuTopImage} />
        <Text style={styles.menuHead}>MENU</Text>
        <HR />
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={styles.menuEntry}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          >
            <Icon name="home" size={28} color="#f44336" />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <HR />
          <TouchableOpacity
            style={styles.menuEntry}
            onPress={() => {
              this.props.navigation.navigate("Log");
            }}
          >
            <Icon name="view-list" size={28} color="#f44336" />
            <Text style={styles.menuText}>Log</Text>
          </TouchableOpacity>
          <HR />
          <TouchableOpacity
            style={styles.menuEntry}
            onPress={() => {
              this.props.navigation.navigate("Settings");
            }}
          >
            <Icon name="settings" size={28} color="#f44336" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <HR />
          <TouchableOpacity
            style={styles.menuEntry}
            onPress={() => {
              this.props.navigation.navigate("About");
            }}
          >
            <Icon name="info" size={28} color="#f44336" />
            <Text style={styles.menuText}>About</Text>
          </TouchableOpacity>
        </View>
        <HR />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: 10
  },
  sideMenuTopImage: {
    resizeMode: "center",
    width: 200,
    height: 200,
    borderRadius: 100
  },
  menuText: {
    fontSize: 15,
    color: "#efe06e",
    paddingLeft: 15
  },
  menuEntry: { flexDirection: "row", alignItems: "center", marginTop: 10, paddingLeft: 20 },
  menuHead: {
    fontSize: 20,
    color: "#efe06e"
  }
});

export default Menu;
