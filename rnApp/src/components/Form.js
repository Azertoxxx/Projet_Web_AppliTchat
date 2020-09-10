import React from "react";
import { View, StyleSheet } from "react-native";

export default class Form extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.form}>{this.props.children}</View>
        <View style={styles.separator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  form: {
    width: "80%",
  },
  separator: {
    flex: 1,
  },
});
