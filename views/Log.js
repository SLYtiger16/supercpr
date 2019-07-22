import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Share
} from "react-native";
import background from "../assets/img/background.png";
import { connect } from "react-redux";
import { store } from "../store/store";

class Log extends React.Component {
  _onPressShare = async () => {
    let message = "";
    this.props.app.log.forEach(e => {
      message += e.item + "\n\r";
    });
    try {
      await Share.share({
        title: "Super CPR Log",
        message: message
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  _onPressClear = () => {
    Alert.alert(
      "Clear log requested...",
      "Are you sure you want to clear it permanently?",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        {
          text: "I'm Sure",
          onPress: () => {
            Alert.alert("Log has been cleared!");
            store.dispatch({ type: "CLEAR_LOG" });
          }
        }
      ],
      { cancelable: false }
    );
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
            <FlatList
              data={this.props.app.log}
              renderItem={({ item, index, separators }) => (
                <TouchableHighlight onShowUnderlay={separators.highlight} onHideUnderlay={separators.unhighlight} key={index}>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{
                        color: item.item.indexOf("CPR") > -1 ? "red" : item.item.indexOf("Med") > -1 ? "white" : "yellow"
                      }}
                    >
                      {item.item}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>
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

const mapStateToProps = state => {
  const { app } = state;
  return { app };
};

export default connect(mapStateToProps)(Log);
