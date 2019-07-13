import React from "react";
import { Text, View, ImageBackground, Image, TouchableOpacity, StyleSheet, Alert, Vibration } from "react-native";
import background from "../assets/img/background.png";
import logo from "../assets/img/noBackground200.png";
import { connect } from "react-redux";
// import Sound from "react-native-sound";

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentTime: "00:00:00",
      medTimer: "00:00",
      medTimerShow: false,
      shockTimer: "00:00",
      shockTimerShow: false,
      startTimer: "00:00:00",
      startTimerShow: false
    };
  }
  componentDidMount = () => {
    this._getCurrentTime();
    this.setState({
      medTimer: "0" + this.props.app.medTimerSet + ":00",
      shockTimer: "0" + this.props.app.shockTimerSet + ":00"
    });
    this.clock = setInterval(this._getCurrentTime, 1000);
  };
  componentWillUnmount = () => {
    clearInterval(this.clock);
    clearInterval(this.medTimer);
    clearInterval(this.shockTimer);
  };
  // _playSound = () => {
  //   Sound.setCategory("Playback");
  //   const beep = new Sound("../assets/sounds/beep522.wav", Sound.MAIN_BUNDLE, error => {
  //     if (error) {
  //       return console.log("Error ", error);
  //     }
  //     console.log("duration: " + beep.getDuration() + " channels: " + beep.getNumberOfChannels());
  //     beep.play(success => {
  //       if (success) {
  //         return console.log("played");
  //       } else {
  //         return console.log("Not Played");
  //       }
  //     });
  //   });
  // };
  _onPressStart = () => {
    // this._playSound();
    Vibration.vibrate(500);
    if (!this.state.startTimerShow) {
      this._startTimerMethod();
      this.startTimer = setInterval(this._startTimerMethod, 1000);
    } else {
      Alert.alert(
        "CPR Timer Running...",
        "Are you sure you want to stop it?",
        [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          {
            text: "I'm Sure",
            onPress: () => {
              if (this.state.medTimerShow || this.state.shockTimerShow) {
                Alert.alert(
                  "Other Timers Are Running...",
                  "Would you like to stop them too?",
                  [
                    {
                      text: "NOPE",
                      onPress: () => {
                        this.setState({ startTimerShow: false, startTimer: "00:00:00" });
                        clearInterval(this.startTimer);
                      },
                      style: "cancel"
                    },
                    {
                      text: "YES PLEASE",
                      onPress: () => {
                        this.setState({
                          startTimerShow: false,
                          startTimer: "00:00:00",
                          medTimerShow: false,
                          medTimer: "0" + this.props.app.medTimerSet + ":00",
                          shockTimerShow: false,
                          shockTimer: "0" + this.props.app.shockTimerSet + ":00"
                        });
                        clearInterval(this.startTimer);
                        clearInterval(this.medTimer);
                        clearInterval(this.shockTimer);
                      }
                    }
                  ],
                  { cancelable: false }
                );
              } else {
                this.setState({ startTimerShow: false, startTimer: "00:00:00" });
                clearInterval(this.startTimer);
              }
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  _onPressMed = () => {
    Vibration.vibrate(500);
    if (!this.state.medTimerShow) {
      this._medTimerMethod();
      this.medTimer = setInterval(this._medTimerMethod, 1000);
    } else {
      Alert.alert(
        "MED Timer Running...",
        "Are you sure you want to stop it?",
        [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          {
            text: "I'm Sure",
            onPress: () => {
              this.setState({ medTimerShow: false, medTimer: "0" + this.props.app.medTimerSet + ":00" });
              clearInterval(this.medTimer);
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  _onPressShock = () => {
    Vibration.vibrate(500);
    if (!this.state.shockTimerShow) {
      this._shockTimerMethod();
      this.shockTimer = setInterval(this._shockTimerMethod, 1000);
    } else {
      Alert.alert(
        "SHOCK Timer Running...",
        "Are you sure you want to stop it?",
        [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          {
            text: "I'm Sure",
            onPress: () => {
              this.setState({ shockTimerShow: false, shockTimer: "0" + this.props.app.shockTimerSet + ":00" });
              clearInterval(this.shockTimer);
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  _startTimerMethod = () => {
    let current = this.state.startTimer.split(":");
    let hours = Number(current[0]);
    let minutes = Number(current[1]);
    let seconds = Number(current[2]) + 1;
    if (seconds >= 60) {
      minutes = minutes + 1;
      seconds = 0;
    }
    if (minutes >= 60) {
      hours = hours + 1;
      minutes = 0;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    this.setState({ startTimerShow: true, startTimer: hours + ":" + minutes + ":" + seconds });
  };
  _medTimerMethod = () => {
    let current = this.state.medTimer.split(":");
    let minutes = Number(current[0]);
    let seconds = Number(current[1]) - 1;
    if (seconds === 0 && minutes === 0) {
      return this._soundMedAlert();
    } else if (seconds < 0) {
      minutes = minutes - 1;
      seconds = 59;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    this.setState({ medTimerShow: true, medTimer: minutes + ":" + seconds });
  };
  _shockTimerMethod = () => {
    let current = this.state.shockTimer.split(":");
    let minutes = Number(current[0]);
    let seconds = Number(current[1]) - 1;
    if (seconds === 0 && minutes === 0) {
      return this._soundShockAlert();
    } else if (seconds < 0) {
      minutes = minutes - 1;
      seconds = 59;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    this.setState({ shockTimerShow: true, shockTimer: minutes + ":" + seconds });
  };
  _soundMedAlert = () => {
    this._onPressMed();
  };
  _soundShockAlert = () => {
    this._onPressShock();
  };
  _getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    this.setState({ currentTime: hour + ":" + minutes + ":" + seconds });
  };
  render = () => {
    return (
      <ImageBackground style={styles.bgImage} source={background}>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={{ color: "yellow", fontSize: 35 }}>{this.state.currentTime}</Text>
            {this.state.startTimerShow ? (
              <Text style={{ fontWeight: "bold", color: "yellow", fontSize: 35 }}>{`CPR Time: ${this.state.startTimer}`}</Text>
            ) : (
              <Image source={logo} />
            )}
          </View>
          <View style={styles.middleButtonRow}>
            <View style={styles.leftMiddleButtonBox}>
              <TouchableOpacity
                style={{
                  ...styles.leftMiddleButton,
                  backgroundColor: this.state.medTimerShow ? "orange" : "rgba(0, 100, 255, 0.4)"
                }}
                onPress={this._onPressMed}
              >
                <Text style={{ fontWeight: "bold", color: this.state.medTimerShow ? "black" : "#efe06e", fontSize: 25 }}>
                  {this.state.medTimerShow ? "MED: " + this.state.medTimer : "MED"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightMiddleButtonBox}>
              <TouchableOpacity
                style={{
                  ...styles.rightMiddleButton,
                  backgroundColor: this.state.shockTimerShow ? "orange" : "rgba(0, 100, 255, 0.4)"
                }}
                onPress={this._onPressShock}
              >
                <Text style={{ fontWeight: "bold", color: this.state.shockTimerShow ? "black" : "#efe06e", fontSize: 25 }}>
                  {this.state.shockTimerShow ? "SHOCK: " + this.state.shockTimer : "SHOCK"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              ...styles.startButton,
              backgroundColor: this.state.startTimerShow ? "#f44336" : "rgba(0, 0, 255, 0.5)"
            }}
            onPress={this._onPressStart}
          >
            <Text style={{ fontWeight: "bold", color: "#efe06e", fontSize: 25 }}>
              {this.state.startTimerShow ? "STOP" : "START"}
            </Text>
          </TouchableOpacity>
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
    height: "45%",
    backgroundColor: "rgba(255, 0, 0, 0.302)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  middleButtonRow: {
    width: "100%",
    height: "20%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  leftMiddleButtonBox: {
    width: "50%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingRight: 7.5,
    paddingBottom: 15
  },
  leftMiddleButton: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  rightMiddleButtonBox: {
    width: "50%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 7.5,
    paddingBottom: 15
  },
  rightMiddleButton: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  startButton: {
    width: "100%",
    height: "25%",
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    width: "100%",
    height: 60,
    backgroundColor: "black",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 24,
    height: 24
  }
});

const mapStateToProps = state => {
  const { app } = state;
  return { app };
};

export default connect(mapStateToProps)(Home);
