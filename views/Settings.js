import React from "react";
import { Text, View, ImageBackground, StyleSheet, Picker } from "react-native";
import background from "../assets/img/background.png";
import { connect } from "react-redux";
import { store } from "../store/store";
import Slider from "@react-native-community/slider";
class HR extends React.Component {
  render = () => <View style={{ width: "100%", height: 1, backgroundColor: "#e2e2e2", marginTop: 15 }} />;
}
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: props.app.speed
    };
  }
  _onSoundPickerChange = value => store.dispatch({ type: "UPDATE", payload: { soundSelected: value, renderUpdate: true } });
  _onMedTimerPickerChange = value =>
    store.dispatch({
      type: "UPDATE",
      payload: { medTimerSet: value, medTimer: this.props.app.medTimerSet, renderUpdate: true }
    });
  _onShockTimerPickerChange = value =>
    store.dispatch({
      type: "UPDATE",
      payload: { shockTimerSet: value, shockTimer: this.props.app.shockTimerSet, renderUpdate: true }
    });
  _onSliderChange = value => {
    let start = async () => store.dispatch({ type: "UPDATE", payload: { speed: value, renderUpdate: true } });
    start().then(store.dispatch({ type: "SET_SOUNDS" }));
  };
  _onSliderSliding = value => this.setState({ sliderValue: value });
  render = () => {
    return (
      <ImageBackground style={styles.bgImage} source={background}>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={styles.title}>Settings</Text>
            <HR />
            <Text style={styles.heading}>Select Metronome Sound:</Text>
            <View style={styles.pickerBG}>
              <Picker
                selectedValue={this.props.app.soundSelected}
                style={styles.picker}
                onValueChange={this._onSoundPickerChange}
              >
                {Object.keys(this.props.app.sounds).map((e, i) => (
                  <Picker.Item label={e} value={e} key={i} />
                ))}
              </Picker>
            </View>
            <Text style={styles.heading}>Select Med Timer Minutes:</Text>
            <View style={styles.pickerBG}>
              <Picker
                selectedValue={this.props.app.medTimerSet}
                style={styles.picker}
                onValueChange={this._onMedTimerPickerChange}
              >
                <Picker.Item label={"01:00"} value={"01:00"} />
                <Picker.Item label={"02:00"} value={"02:00"} />
                <Picker.Item label={"03:00"} value={"03:00"} />
                <Picker.Item label={"04:00"} value={"04:00"} />
                <Picker.Item label={"05:00"} value={"05:00"} />
              </Picker>
            </View>
            <Text style={styles.heading}>Select Shock Timer Minutes:</Text>
            <View style={styles.pickerBG}>
              <Picker
                selectedValue={this.props.app.shockTimerSet}
                style={styles.picker}
                onValueChange={this._onShockTimerPickerChange}
              >
                <Picker.Item label={"01:00"} value={"01:00"} />
                <Picker.Item label={"02:00"} value={"02:00"} />
                <Picker.Item label={"03:00"} value={"03:00"} />
                <Picker.Item label={"04:00"} value={"04:00"} />
                <Picker.Item label={"05:00"} value={"05:00"} />
              </Picker>
            </View>
            <Text style={styles.heading}>Select Metronome BPM:</Text>
            <View style={styles.sliderView}>
              <Text style={styles.heading}>{`${this.state.sliderValue} BPM`}</Text>
              <Slider
                style={{ width: "80%", height: 60 }}
                minimumValue={100}
                maximumValue={120}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="white"
                onSlidingComplete={this._onSliderChange}
                value={this.props.app.speed}
                thumbTintColor="#efe06e"
                step={1}
                onValueChange={this._onSliderSliding}
              />
            </View>
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
    height: "100%",
    padding: 15,
    backgroundColor: "rgba(255, 0, 0, 0.302)",
    borderRadius: 20
  },
  title: { color: "#efe06e", fontSize: 25 },
  heading: { color: "white", fontSize: 20, marginTop: 20 },
  text: { color: "#efe06e", fontSize: 18, marginTop: 10 },
  pickerBG: { backgroundColor: "#efe06e", paddingHorizontal: 15, borderRadius: 5, marginTop: 15 },
  picker: { height: 50, width: "100%" },
  sliderView: {
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  const { app } = state;
  return { app };
};

export default connect(mapStateToProps)(Settings);
