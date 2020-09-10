import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";

import PickDocument from "../api/pickDocument";
import Contacts from "../api/contacts";
import GPS from "../api/gps";

import { connect } from "react-redux";

import { sendMessage } from "../db/message";

const defaultState = {
  name: "",
  uri: "",

  message: "",

  isSending: false,
  error: "",
};

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  updateState = (id, value) => {
    // Update specific value of the state
    let nextState = { ...this.state };
    nextState[id] = value;

    this.setState(nextState);
  };

  getContacts = async () => {
    // API to get contacts info
    const contactsInfo = new Contacts();
    const response = await contactsInfo.getContacts();

    return response;
  };

  getLocation = async () => {
    const gps = new GPS();
    const response = await gps.getLocation();

    return response;
  };

  pickDocument = async () => {
    // Update the state in order to store name and uri

    const pickDocument = new PickDocument();
    const { status, name, uri, error } = await pickDocument.pickDocument();

    if (status === "OK") {
      this.setState({
        ...this.state,
        name: name,
        uri: uri,
      });

      return;
    }

    // Status is "Cancel"
    if (error !== "") {
      console.error(error);
    }
  };

  displayChoice = () => {
    const { name, uri } = this.state;
    if (name === "") {
      return <View />;
    }

    return <Image style={{ width: 200, height: 200 }} source={{ uri: uri }} />;
  };

  displayScreen = () => {
    if (this.state.isSending) {
      return (
        <View style={[styles.container, styles.vertical]}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      );
    }

    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text style={styles.title}>Send a file</Text>

        <View>
          <TextInput
            onChangeText={(val) => this.updateState("message", val)}
            placeholder={"Message"}
          />
        </View>
        <Button title="Pick document" onPress={this.pickDocument} />
        {this.displayChoice()}

        <Button title="Send" onPress={() => this.submit()} />

        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    );
  };

  submit = async () => {
    this.updateState("isSending", true);

    const contactsPhoneNumber = await this.getContacts();
    const gps = await this.getLocation();
    const { uri, message } = this.state;
    const token = this.props.profil.token;

    sendMessage(
      {
        contactsPhoneNumber: contactsPhoneNumber,
        uri: uri,
        message: message,
        gps: gps,
      },
      token,
      (errorMsg) => {
        if (errorMsg === undefined) {
          // No error
          this.setState({ ...defaultState });
        } else {
          this.setState({ ...this.state, error: errorMsg, isSending: false });
        }
      }
    );
  };

  render() {
    // this.getContacts();
    return this.displayScreen();
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
  },
  vertical: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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

export default connect(mapStateToProps)(Send);
