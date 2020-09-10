import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class MessageReceive extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.alignText, styles.content]}>
          {this.props.content}
        </Text>
        <View style={styles.info}>
          <Text>{this.props.contact} </Text>
          <Text>{this.props.data} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 5,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  alignText: {
    textAlign: "center",
    fontSize: 20,
  },
  content: { color: "blue" },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
