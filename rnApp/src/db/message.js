import { URL_SERVER } from "../constantes/db";

export const sendMessage = async (object, token, setErrorState) => {
  const { message, contactsPhoneNumber } = object;

  const API_VALUE = "/api/messages/new";
  const URL = URL_SERVER + API_VALUE;

  setErrorState();

  // Server not working
  /*  fetch(URL, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: message }),
  })
    .then((res) => res.json()) // Convert JSON msessage receive into js object
    .then((res) => {
      const error = res.error;
      setErrorState(error);
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    }); */
};

export const getMessage = async (gps, token, setErrorState) => {
  // Server not yet implemented
  const error = "";

  const messages = [
    {
      content: "This view is awsome",
      date: "14/04/2020",
      contact: "Bob",
    },
    {
      content: "First",
      date: "01/01/1900",
      contact: "Jérémy",
    },
    {
      content: "I'm arround",
      date: "01/05/2020",
      contact: "Alicia",
    },
  ];
  setErrorState(error, messages);
};
