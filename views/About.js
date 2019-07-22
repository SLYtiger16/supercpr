import React from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import background from "../assets/img/background.png";

class About extends React.Component {
  render = () => {
    return (
      <ImageBackground style={styles.bgImage} source={background}>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={styles.title}>About Super CPR v2.0</Text>
            <Text style={styles.text}>© 2017-2019 - 610 Industries, LLC</Text>
            <Text style={styles.text}>
              Super CPR is meant to be a tempo guide only and in no way is designed to establish any clinical standard. Use at
              your own risk. By using this application you agree to remove any liability associated with it's use from 610
              Industries, LLC and it's owners, customers, contractors, or anyone in any way associated with 610 Industries, LLC
              and this application.
            </Text>
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
    padding: 10
  },
  infoBox: {
    width: "100%",
    height: "45%",
    padding: 15,
    backgroundColor: "rgba(255, 0, 0, 0.302)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  title: { color: "#efe06e", fontSize: 25 },
  text: { color: "#efe06e", fontSize: 18, marginTop: 10 }
});

export default About;
