import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";

class HeaderIcon extends React.Component {
  _onPressButton = () => {
    if (this.props.app.medTimerShow || this.props.app.shockTimerShow || this.props.app.startTimerShow) {
      return Alert.alert("Timers are running...", "All timers must be stopped to enter the menu!");
    }
    this.props.navigationProps.toggleDrawer();
  };
  render = () => {
    return (
      <TouchableOpacity
        style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 24, width: 24, marginRight: 20 }}
        onPress={this._onPressButton}
        title={"Menu"}
      >
        <Icon name="menu" size={28} color="#efe06e" />
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = state => {
  const { app } = state;
  return { app };
};

export default connect(mapStateToProps)(HeaderIcon);
