import {
  setConnectionUser,
  setInfoUser,
  setTokenUser,
} from "../redux/utilities/registration";

import { URL_SERVER } from "../constantes/db";

export const signUp = (phoneNumber, name, bio, password, setStateError) => {
  // Create a new account
  const API_VALUE = "/api/users/register";
  const URL = URL_SERVER + API_VALUE;

  const valueJson = {
    phoneNumber: phoneNumber,
    username: name,
    bio: bio,
    password: password,
  };

  fetch(URL, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valueJson), // body data type must match "Content-Type" header
  })
    .then((res) => res.json()) // Convert JSON message receive into js object
    .then((res) => {
      const { error } = res;

      if (error === undefined) {
        // No error, the user is connected
        console.log("Successful SIGN UP");
        signIn(phoneNumber, password, null); // To collect user infos and get connected
      }
      setStateError(error); // Set message for the form
    })
    .catch((error) => {
      console.error(error);
    });
};

export const signIn = (phoneNumber, password, setStateError) => {
  // Login
  const API_VALUE = "/api/users/login";
  const URL = URL_SERVER + API_VALUE;

  const valueJson = {
    phoneNumber: phoneNumber,
    password: password,
  };

  fetch(URL, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valueJson), // body data type must match "Content-Type" header
  })
    .then((res) => res.json()) // Convert JSON message receive into js object
    .then((res) => {
      const { error, token } = res;

      if (error === undefined) {
        // No error, the user is connected
        console.log("Successful SIGN IN");

        setConnectionUser(true);
        setTokenUser(token);
        setInfoUserFromDB(token);
      }
      setStateError(error); // Set message for the form
    })
    .catch((error) => {
      console.log("error");
      console.log("Sign in failed !");
      console.log(error);
    });
};

const setInfoUserFromDB = (token) => {
  const API_VALUE = "/api/users/me";
  const URL = URL_SERVER + API_VALUE;

  fetch(URL, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json()) // Convert JSON message receive into js object
    .then((res) => {
      const { bio, phoneNumber, username } = res;
      setInfoUser({ phoneNumber: phoneNumber, name: username, bio: bio });
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
};
