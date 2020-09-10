import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default class MenuRegister extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={styles.text}>
            You need to be authentify in order to use this application
          </Text>
        </View>
        <View style={styles.containerButtons}>
          <Button
            onPress={() => this.props.navigation.navigate("SignIn")}
            title={"Sign In"}
          />
          <View style={styles.separator} />
          <Button
            onPress={() => this.props.navigation.navigate("SignUp")}
            title={"Sign Up"}
          />
        </View>
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
  containerText: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  containerButtons: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  separator: {
    width: 50,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
  },
});
