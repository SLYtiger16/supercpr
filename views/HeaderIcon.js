import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class HeaderIcon extends React.Component {
  _onPressButton = () => this.props.navigationProps.toggleDrawer();
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

export default HeaderIcon;
