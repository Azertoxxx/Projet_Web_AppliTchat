import React from "react";

// Expo import
import { AppLoading } from "expo";
import * as Font from "expo-font";

// Main application
import MainApp from "./src/Main";

//Redux
import { Provider } from "react-redux";
import STORE from "./src/redux/store/store";

// Library font awsome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash);

const customFonts = {};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // Verify that every thing is loaded
      isReady: false,
    };
  }

  componentDidMount() {
    // When component is mounted
    // Load font
    this._loadFontsAsync();
  }

  async _loadFontsAsync() {
    // Load font asynchrous
    await Font.loadAsync(customFonts);
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      // Font not loaded
      // The app is loading
      return <AppLoading />;
    }
    // Font Loaded

    // The store is shared with the entire app
    return (
      <Provider store={STORE}>
        <MainApp />
      </Provider>
    );
  }
}
