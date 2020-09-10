// Connection boolean
export const TYPE_SET_CONNECTION = "SET_CONNECTION";

export const setConnection = (boolean) => ({
  type: TYPE_SET_CONNECTION,
  value: boolean,
});

// Profil informations
export const TYPE_SET_PROFIL_INFOS = "SET_PROFIL_INFOS";

export const setProfilInfos = (object) => ({
  type: TYPE_SET_PROFIL_INFOS,
  value: object,
});

export const TYPE_SET_TOKEN = "SET_TOKEN";

export const setToken = (token) => ({
  type: TYPE_SET_TOKEN,
  value: token,
});
