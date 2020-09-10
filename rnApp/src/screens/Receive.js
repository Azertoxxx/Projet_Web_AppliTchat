import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";

import { connect } from "react-redux";

import MessageDisplay from "../components/MessageDisplay";

import { getMessage } from "../db/message";
import GPS from "../api/gps";

class Receive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],

      isSending: false,

      error: "",
    };
  }

  getLocation = async () => {
    const gps = new GPS();
    const response = await gps.getLocation();

    return response;
  };

  displayMessages = () => {
    return this.state.messages.map((msg) => (
      <MessageDisplay
        content={msg.content}
        contact={msg.contact}
        data={msg.date}
        key={`${msg.data}${msg.contact}`}
      />
    ));
  };

  submit = async () => {
    this.setState({ ...this.state, isSending: true });
    const gpsCoordinates = await this.getLocation();
    const token = this.props.profil.token;

    getMessage(gpsCoordinates, token, (error, messages) => {
      this.setState({
        ...this.state,
        error: error,
        isSending: false,
        messages: messages,
      });
    });
  };

  render() {
    if (this.state.isSending) {
      return (
        <View style={[styles.container, styles.vertical]}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Receive message</Text>
        {this.displayMessages()}
        <Button onPress={this.submit} title={"Get Messages"} />
        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  vertical: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  errorText: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    profil: {
      token: state.profil.token,
    },
  };
};

export default connect(mapStateToProps)(Receive);
