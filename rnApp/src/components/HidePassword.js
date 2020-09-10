import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

import InputCustomVerification from "../components/InputVerification";
import { STYLES } from "../constantes/styles";

export default class HidePwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdSecured: true,
    };
  }

  setVisibility = () => {
    let nextState = this.state;
    nextState.pwdSecured = !nextState.pwdSecured;

    this.setState(nextState);
  };

  displayIcon = () => {
    const icon = this.state.pwdSecured ? faEye : faEyeSlash;
    return <FontAwesomeIcon icon={icon} size={40} />;
  };

  render() {
    const { pwdSecured } = this.state;
    const {
      value,
      placeholder,
      onChangeText,
      isSubmit,
      isCorrect,
      textInvalid,
    } = this.props;
    return (
      <View style={[styles.container, STYLES.input]}>
        <InputCustomVerification
          value={value}
          placeholder={placeholder}
          keyboardType={"default"}
          styleInput={{}}
          secureTextEntry={pwdSecured}
          onChangeText={(val) => onChangeText(val)}
          isSubmit={isSubmit}
          isCorrect={isCorrect}
          textInvalid={textInvalid}
        />

        <TouchableOpacity onPress={this.setVisibility}>
          {this.displayIcon()}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
