import * as DocumentPicker from "expo-document-picker";

export default class PickDocument {
  pickDocument = async () => {
    try {
      const pickerResponse = await DocumentPicker.getDocumentAsync();
      let response = { status: "cancel", name: "", uri: "", error: "" };

      if (pickerResponse.type === "cancel") {
        // User cancel the request
        // Nothing to do

        return response;
      }

      if (pickerResponse.type === "success") {
        // Document is put in the cache of the app
        const { name, uri } = pickerResponse;

        response = {
          ...response,
          status: "OK",
          name: name,
          uri: uri,
        };

        return response;
      }
    } catch (error) {
      response = { ...response, error: error };
      return response;
    }
  };
}
