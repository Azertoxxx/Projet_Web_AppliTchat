import React from "react";
import { Button, Text, StyleSheet } from "react-native";

import { STYLES } from "../constantes/styles";
import { signIn } from "../db/registration";

import HidePassword from "../components/HidePassword";
import InputCustomVerification from "../components/InputVerification";
import Form from "../components/Form";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      pwd: "",

      error: "",
    };
  }

  _isFigure = (test) => {
    // 0 -> 48
    // 9 -> 57
    const charValue = test.toString().charCodeAt();
    return 48 <= charValue && charValue <= 57;
  };

  updatePhoneNumber = (value) => {
    // Verify that the user use number
    // Update the value of phone number
    const inputV = value.toString();

    for (let i = 0; i < inputV.length; i++) {
      if (!this._isFigure(inputV[i])) {
        // The input is invalid
        return;
      }
    }

    let nextState = this.state;
    nextState.phoneNumber = value;
    this.setState(nextState);
  };

  updateState = (id, value) => {
    // Update specific value of the state
    let nextState = { ...this.state };
    nextState[id] = value;

    this.setState(nextState);
  };

  submitFunction = () => {
    // Submit function
    signIn(this.state.phoneNumber, this.state.pwd, (errorText) =>
      this.setState({ ...this.state, error: errorText })
    );
  };

  render() {
    const { phoneNumber, pwd } = this.state;

    return (
      <Form>
        <InputCustomVerification
          value={phoneNumber}
          placeholder={"Phone number"}
          keyboardType="number-pad"
          style={STYLES.input}
          onChangeText={this.updatePhoneNumber}
          // Useless, we only take the server response
          isSubmit={false}
          isCorrect={false}
          textInvalid={""}
        />
        <HidePassword
          value={pwd}
          placeholder={"Password"}
          onChangeText={(val) => this.updateState("pwd", val)}
          // Useless, we only take the server response
          isSubmit={false}
          isCorrect={false}
          textInvalid={""}
        />
        <Button title="Sign In" onPress={this.submitFunction} />
        <Text style={styles.errorText}>{this.state.error}</Text>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
