import React from "react";
import { Text, View, ImageBackground, StyleSheet, Alert, TouchableOpacity } from "react-native";
import background from "../assets/img/background.png";

class Log extends React.Component {
  _onPressShare = () => {
    Alert.alert("Share");
  };
  _onPressClear = () => {
    Alert.alert("Clear");
  };
  render = () => {
    return (
      <ImageBackground style={styles.bgImage} source={background}>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={styles.text}>Usage Log</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={this._onPressClear}>
                <Text style={{ color: "#efe06e", fontWeight: "bold" }}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this._onPressShare}>
                <Text style={{ color: "#efe06e", fontWeight: "bold" }}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", height: 1, backgroundColor: "#e2e2e2", marginTop: 10 }} />
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
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10
  },
  infoBox: {
    width: "100%",
    height: "100%",
    padding: 15,
    backgroundColor: "rgba(0, 100, 255, 0.4)",
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
  text: { color: "#efe06e", fontSize: 25 },
  buttonRow: {
    width: "100%",
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    width: 60,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f44336",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Log;
