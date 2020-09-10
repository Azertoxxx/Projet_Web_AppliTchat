import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default class InputVerification extends React.Component {
  // isCorrect is the validity of the field
  // Only use if isSubmit is true

  getCustomStyle = () => {
    const { isCorrect, isSubmit } = this.props;
    if (!isSubmit) {
      return {};
    }

    // The form is submit
    // The field can be verify

    if (isCorrect) {
      return styles.isValid;
    }
    return styles.isInvalid;
  };

  displayValidityText = () => {
    const { isCorrect, isSubmit, textInvalid } = this.props;
    if (!isSubmit) {
      return;
    }

    // The form is submit
    // The field can be verify

    if (!isCorrect) {
      return <Text style={styles.textValidity}>{textInvalid}</Text>;
    }
  };

  render() {
    const {
      value,
      keyboardType,
      placeholder,
      onChangeText,
      styleInput,
      secureTextEntry,
    } = this.props;

    return (
      <View style={this.getCustomStyle()}>
        <TextInput
          style={styleInput}
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onChangeText={(val) => onChangeText(val)}
        />
        {this.displayValidityText()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  isValid: {
    borderWidth: 2,
    borderColor: "green",
    marginTop: 5,
    marginBottom: 5,
  },
  isInvalid: {
    borderWidth: 2,
    borderColor: "red",
    marginTop: 5,
    marginBottom: 5,
  },
  textValidity: {
    color: "grey",
    fontStyle: "italic",
    textAlign: "center",
  },
});
