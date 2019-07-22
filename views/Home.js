import React from "react";
import { Text, View, ImageBackground, Image, TouchableOpacity, StyleSheet, Alert, Vibration } from "react-native";
import background from "../assets/img/background.png";
import logo from "../assets/img/noBackground200.png";
import { connect } from "react-redux";
import { store } from "../store/store";
import { PlaySound } from "react-native-play-sound";
import moment from "moment";
import { NavigationEvents } from "react-navigation";
import KeepAwake from "react-native-keep-awake";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: "00:00:00"
    };
  }
  componentDidMount = () => {
    store.dispatch({
      type: "UPDATE",
      payload: {
        medTimer: this.props.app.medTimerSet,
        shockTimer: this.props.app.shockTimerSet
      }
    });
    this._getCurrentTime();
    store.dispatch({ type: "SET_SOUNDS" });
    this.clock = setInterval(this._getCurrentTime, 1000);
  };
  componentWillUnmount = () => {
    clearInterval(this.clock);
    clearInterval(this.medTimer);
    clearInterval(this.shockTimer);
  };
  _playSound = () => {
    if (this.props.app.isPlaying === true) {
      this.props.app.sounds.Beep.stop();
      this.props.app.sounds.Click.stop();
      this.props.app.sounds.Floop.stop();
      this.props.app.sounds.Laser.stop();
      this.props.app.sounds.Metal.stop();
      this.props.app.sounds.Pew.stop();
      this.props.app.sounds.Zap.stop();
    } else {
      this.props.app.sounds[this.props.app.soundSelected].run();
    }
    store.dispatch({ type: "TOGGLE_ISPLAYING" });
  };
  _onPressStart = () => {
    Vibration.vibrate(500);
    if (!this.props.app.startTimerShow) {
      store.dispatch({ type: "UPDATE_LOG", payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - CPR Metronome Started" });
      this._playSound();
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
              if (this.props.app.medTimerShow || this.props.app.shockTimerShow) {
                Alert.alert(
                  "Other Timers Are Running...",
                  "Would you like to stop them too?",
                  [
                    {
                      text: "NOPE",
                      onPress: () => {
                        store.dispatch({ type: "UPDATE", payload: { startTimerShow: false, startTimer: "00:00:00" } });
                        clearInterval(this.startTimer);
                        store.dispatch({
                          type: "UPDATE_LOG",
                          payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - CPR Metronome Stopped"
                        });
                        this._playSound();
                      },
                      style: "cancel"
                    },
                    {
                      text: "YES PLEASE",
                      onPress: () => {
                        store.dispatch({
                          type: "UPDATE",
                          payload: {
                            startTimerShow: false,
                            startTimer: "00:00:00",
                            medTimerShow: false,
                            medTimer: this.props.app.medTimerSet,
                            shockTimerShow: false,
                            shockTimer: this.props.app.shockTimerSet
                          }
                        });
                        clearInterval(this.startTimer);
                        clearInterval(this.medTimer);
                        clearInterval(this.shockTimer);
                        store.dispatch({
                          type: "UPDATE_LOG",
                          payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - CPR Metronome Stopped"
                        });
                        this._playSound();
                      }
                    }
                  ],
                  { cancelable: false }
                );
              } else {
                store.dispatch({ type: "UPDATE", payload: { startTimerShow: false, startTimer: "00:00:00" } });
                clearInterval(this.startTimer);
                store.dispatch({
                  type: "UPDATE_LOG",
                  payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - CPR Metronome Stopped"
                });
                this._playSound();
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
    if (!this.props.app.medTimerShow) {
      store.dispatch({ type: "UPDATE_LOG", payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - Med Timer Started" });
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
              store.dispatch({
                type: "UPDATE",
                payload: { medTimerShow: false, medTimer: this.props.app.medTimerSet }
              });
              store.dispatch({ type: "UPDATE_LOG", payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - Med Timer Stopped" });
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
    if (!this.props.app.shockTimerShow) {
      store.dispatch({ type: "UPDATE_LOG", payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - Shock Timer Started" });
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
              store.dispatch({
                type: "UPDATE",
                payload: { shockTimerShow: false, shockTimer: this.props.app.shockTimerSet }
              });
              store.dispatch({
                type: "UPDATE_LOG",
                payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - Shock Timer Stopped"
              });
              clearInterval(this.shockTimer);
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  _startTimerMethod = () => {
    let current = this.props.app.startTimer.split(":");
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
    store.dispatch({ type: "UPDATE", payload: { startTimerShow: true, startTimer: hours + ":" + minutes + ":" + seconds } });
  };
  _medTimerMethod = () => {
    let current = this.props.app.medTimer.split(":");
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
    store.dispatch({ type: "UPDATE", payload: { medTimerShow: true, medTimer: minutes + ":" + seconds } });
  };
  _shockTimerMethod = () => {
    let current = this.props.app.shockTimer.split(":");
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
    store.dispatch({ type: "UPDATE", payload: { shockTimerShow: true, shockTimer: minutes + ":" + seconds } });
  };
  _soundMedAlert = () => {
    this.props.app.sounds[this.props.app.soundSelected].stop();
    PlaySound("alert");
    setTimeout(() => {
      if (this.props.app.isPlaying) this.props.app.sounds[this.props.app.soundSelected].run();
    }, 2500);
    store.dispatch({ type: "UPDATE", payload: { medTimerShow: false, medTimer: this.props.app.medTimerSet } });
    store.dispatch({ type: "UPDATE_LOG", payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - Med Timer Stopped" });
    clearInterval(this.medTimer);
  };
  _soundShockAlert = () => {
    this.props.app.sounds[this.props.app.soundSelected].stop();
    PlaySound("alert");
    setTimeout(() => {
      if (this.props.app.isPlaying) this.props.app.sounds[this.props.app.soundSelected].run();
    }, 2500);
    store.dispatch({
      type: "UPDATE",
      payload: { shockTimerShow: false, shockTimer: this.props.app.shockTimerSet }
    });
    store.dispatch({ type: "UPDATE_LOG", payload: moment().format("YYYY-MM-DD HH:mm:ss") + " - Shock Timer Stopped" });
    clearInterval(this.shockTimer);
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
        {(this.props.app.medTimerShow || this.props.app.shockTimerShow || this.props.app.startTimerShow) && <KeepAwake />}
        <NavigationEvents
          onWillFocus={() => {
            if (this.props.app.renderUpdate) {
              clearInterval(this.startTimer);
              clearInterval(this.medTimer);
              clearInterval(this.shockTimer);
              this.setState(this.state);
              store.dispatch({
                type: "UPDATE",
                payload: {
                  medTimer: this.props.app.medTimerSet,
                  medTimerShow: false,
                  shockTimer: this.props.app.shockTimerSet,
                  shockTimerShow: false,
                  startTimer: "00:00:00",
                  startTimerShow: false,
                  renderUpdate: false
                }
              });
            }
          }}
        />
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={{ color: "yellow", fontSize: 35 }}>{this.state.currentTime}</Text>
            {this.props.app.startTimerShow ? (
              <Text style={{ fontWeight: "bold", color: "yellow", fontSize: 35 }}>{`CPR Time: ${
                this.props.app.startTimer
              }`}</Text>
            ) : (
              <Image source={logo} />
            )}
          </View>
          <View style={styles.middleButtonRow}>
            <View style={styles.leftMiddleButtonBox}>
              <TouchableOpacity
                style={{
                  ...styles.leftMiddleButton,
                  backgroundColor: this.props.app.medTimerShow ? "orange" : "rgba(0, 100, 255, 0.4)"
                }}
                onPress={this._onPressMed}
              >
                <Text style={{ fontWeight: "bold", color: this.props.app.medTimerShow ? "black" : "#efe06e", fontSize: 25 }}>
                  {this.props.app.medTimerShow ? "MED: " + this.props.app.medTimer : "MED"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightMiddleButtonBox}>
              <TouchableOpacity
                style={{
                  ...styles.rightMiddleButton,
                  backgroundColor: this.props.app.shockTimerShow ? "orange" : "rgba(0, 100, 255, 0.4)"
                }}
                onPress={this._onPressShock}
              >
                <Text style={{ fontWeight: "bold", color: this.props.app.shockTimerShow ? "black" : "#efe06e", fontSize: 25 }}>
                  {this.props.app.shockTimerShow ? "SHOCK: " + this.props.app.shockTimer : "SHOCK"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              ...styles.startButton,
              backgroundColor: this.props.app.startTimerShow ? "#f44336" : "rgba(0, 0, 255, 0.5)"
            }}
            onPress={this._onPressStart}
          >
            <Text style={{ fontWeight: "bold", color: "#efe06e", fontSize: 25 }}>
              {this.props.app.startTimerShow ? "STOP" : "START"}
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 255, 0.8)",
    borderRadius: 20,
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
