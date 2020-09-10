import * as Location from "expo-location";

export default class GPS {
  constructor() {
    this.access = false;
    this.isEnabled = false;
    this.latitude = "";
    this.longitude = "";
  }

  askPermission = async () => {
    // Ask permission to the user to use location
    // If the permission was already given nothing happen (for the user)
    this.access = false;

    try {
      const { status } = await Location.requestPermissionsAsync();
      this.access = status === "granted" ? true : false;
    } catch (error) {
      console.error(`error askPermission : ${error}`);
    }
  };

  serviceIsEnabled = async () => {
    // Check if the location service is enabled by the user
    this.isEnabled = false;

    try {
      this.isEnabled = await Location.hasServicesEnabledAsync();
    } catch (error) {
      console.error(`error serviceIsEnabled : ${error}`);
    }
  };

  getCoordinates = async () => {
    // Get the coordinates of the user
    // Prerequisite -> access and isEnabled are true

    try {
      const { coords } = await Location.getCurrentPositionAsync({});

      this.latitude = coords.latitude;
      this.longitude = coords.longitude;
    } catch (error) {
      console.error(`error getLocation : ${error}`);
    }
  };

  getLocation = async () => {
    await this.askPermission(); // Wait to receive the permission
    await this.serviceIsEnabled(); // Wait to check if the service is enabled

    if (this.access && this.isEnabled) {
      await this.getCoordinates();
    }

    return {
      // Can be empty
      latitude: this.latitude,
      longitude: this.longitude,
    };
  };
}
