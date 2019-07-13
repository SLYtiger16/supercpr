import React from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import background from "../assets/img/background.png";

class Settings extends React.Component {
  render = () => {
    return (
      <ImageBackground style={styles.bgImage} source={background}>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={{ color: "white" }}>610 Industries, LLC</Text>
        </View>
      </ImageBackground>
    );
  };
}

const styles = StyleSheet.create({
  bgImage: { width: "100%", height: "100%" },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 10
  },
  infoBox: {
    width: "100%",
    height: "45%",
    padding: 15,
    backgroundColor: "rgba(255, 0, 0, 0.302)",
    borderRadius: 20
  },
  footer: {
    width: "100%",
    height: 60,
    backgroundColor: "black",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center"
  },
  title: { color: "#efe06e", fontSize: 25 },
  text: { color: "#efe06e", fontSize: 18, marginTop: 10 }
});

export default Settings;
