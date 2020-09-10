import * as Contacts from "expo-contacts";

export default class ContactsAPI {
  constructor() {
    this.access = false;
    this.contacts = [];
  }

  askPermission = async () => {
    // Ask permission to the user to use contacts info
    // If the permission was already given nothing happen (for the user)
    this.access = false;

    try {
      const { status } = await Contacts.requestPermissionsAsync();
      this.access = status === "granted" ? true : false;
    } catch (error) {
      console.error(`error askPermission : ${error}`);
    }
  };

  getInfoContacts = async () => {
    // Return array of phoneNumber contacts of the user
    const response = await Contacts.getContactsAsync({
      fields: Contacts.PHONE_NUMBERS,
    });

    const arrayContactsFormatted = response.data.map((contact) => {
      let phoneNumber = contact.phoneNumbers[0].number;

      if (phoneNumber[0] === "+") {
        phoneNumber = "0" + phoneNumber.substring(3);
      }

      return phoneNumber;
    });

    this.contacts = arrayContactsFormatted;
  };

  getContacts = async () => {
    await this.askPermission(); // Wait to receive the permission

    if (this.access) {
      await this.getInfoContacts();
    }

    return this.contacts;
  };
}
