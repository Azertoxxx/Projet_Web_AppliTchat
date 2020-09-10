import React from "react";
import { Button, Text, StyleSheet } from "react-native";

import { STYLES } from "../constantes/styles";
import { signUp } from "../db/registration";

import HidePassword from "../components/HidePassword";
import InputCustomVerification from "../components/InputVerification";
import Form from "../components/Form";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      name: "",
      bio: "",
      pwdMain: "",
      pwdConfirm: "",

      isSubmit: false,
      verifyPhone: false,
      verifyName: false,
      verifyPwd: false,
      verifyPwdConfirm: false,

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

  verifyPhoneNumber = () => {
    // Return boolean
    // Verify is the phone number is correct (ie contains 10 digits)

    return this.state.phoneNumber.toString().length === 10;
  };

  verifyName = () => {
    // Return boolean
    // Verify is the name is correct (ie not empty)

    return this.state.name.toString().length !== 0;
  };

  verifyPwd = () => {
    // Return boolean
    // Verify is the pwd is correct (ie not empty)

    return this.state.pwdMain.toString().length !== 0;
  };

  verifyPwdConfirmation = () => {
    // Return boolean
    // Verify is the pwdConfirm is correct (ie equals to pwdMain)

    return this.state.pwdMain === this.state.pwdConfirm;
  };

  verifyAll = () => {
    // Verify all fields
    // Return true is all are correct
    let nextState = { ...this.state };

    nextState.isSubmit = true;

    nextState.verifyPhone = this.verifyPhoneNumber();
    nextState.verifyName = this.verifyName();
    nextState.verifyPwd = this.verifyPwd();
    nextState.verifyPwdConfirm = this.verifyPwdConfirmation();

    this.setState(nextState);

    return (
      nextState.verifyPhone &&
      nextState.verifyName &&
      nextState.verifyPwd &&
      nextState.verifyPwdConfirm
    );
  };

  submitFunction = () => {
    // Submit function
    const canBeSubmit = this.verifyAll();

    if (!canBeSubmit) {
      return;
    }

    signUp(
      this.state.phoneNumber,
      this.state.name,
      this.state.bio,
      this.state.pwdMain,
      (errorValue) => this.setState({ ...this.state, error: errorValue })
    );
  };

  render() {
    const {
      phoneNumber,
      name,
      bio,
      pwdMain,
      pwdConfirm,
      isSubmit,
      verifyPhone,
      verifyName,
      verifyPwd,
      verifyPwdConfirm,
    } = this.state;

    return (
      <Form>
        <InputCustomVerification
          value={phoneNumber}
          placeholder={"Phone number"}
          keyboardType="number-pad"
          styleInput={STYLES.input}
          onChangeText={this.updatePhoneNumber}
          isSubmit={isSubmit}
          isCorrect={verifyPhone}
          textInvalid={"Must contains 10 digits"}
        />

        <InputCustomVerification
          value={name}
          placeholder={"Name"}
          keyboardType={"default"}
          styleInput={STYLES.input}
          onChangeText={(val) => this.updateState("name", val)}
          isSubmit={isSubmit}
          isCorrect={verifyName}
          textInvalid={"Can't be empty"}
        />
        <InputCustomVerification
          value={bio}
          placeholder={"Bio (optional)"}
          keyboardType={"default"}
          styleInput={STYLES.input}
          onChangeText={(val) => this.updateState("bio", val)}
          // Optional
          isSubmit={false}
          isCorrect={false}
          textInvalid={"Optional"}
        />

        <HidePassword
          value={pwdMain}
          placeholder={"Password"}
          onChangeText={(val) => this.updateState("pwdMain", val)}
          isSubmit={isSubmit}
          isCorrect={verifyPwd}
          textInvalid={"Can't be empty"}
        />
        <HidePassword
          value={pwdConfirm}
          placeholder={"pwdConfirm"}
          onChangeText={(val) => this.updateState("pwdConfirm", val)}
          isSubmit={isSubmit}
          isCorrect={verifyPwdConfirm}
          textInvalid={"Passwords don't match"}
        />
        <Button title="Sign Up" onPress={this.submitFunction} />
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
