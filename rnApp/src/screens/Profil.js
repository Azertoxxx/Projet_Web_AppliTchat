import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { setConnectionUser } from "../redux/utilities/registration";
import { connect } from "react-redux";

class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, bio, phoneNumber, token } = this.props.profil;
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Hi {name} !</Text>
        <Text style={styles.bio}>{bio}</Text>
        <Text style={styles.phoneNumber}>Phone number : {phoneNumber}</Text>
        <Button title="Disconnect" onPress={() => setConnectionUser(false)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  name: {
    fontSize: 30,
  },
  bio: {
    fontSize: 20,
  },
  phoneNumber: {
    fontSize: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    profil: {
      phoneNumber: state.profil.phoneNumber,
      name: state.profil.name,
      bio: state.profil.bio,
    },
  };
};

export default connect(mapStateToProps)(Profil);
