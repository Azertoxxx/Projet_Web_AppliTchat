import React from "react";

// React router
import Navigation from "./navigation/Navigation";
import StackRegister from "./navigation/StackRegister";

//Redux
import { connect } from "react-redux";

class Main extends React.Component {
  render() {
    if (this.props.connection.isConnected) {
      // The user is connected
      // Display the app
      return <Navigation />;
    }

    // Display the register menu
    return <StackRegister />;
  }
}

const mapStateToProps = (state) => {
  return {
    connection: {
      isConnected: state.connection.isConnected,
    },
  };
};

export default connect(mapStateToProps)(Main);
