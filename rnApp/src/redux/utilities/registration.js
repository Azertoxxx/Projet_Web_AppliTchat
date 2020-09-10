import STORE from "../store/store";
import { setConnection, setProfilInfos, setToken } from "../actions/actions";

export const setConnectionUser = (boolean) => {
  STORE.dispatch(setConnection(boolean));
};

export const setInfoUser = (infos) => {
  STORE.dispatch(setProfilInfos(infos));
};

export const setTokenUser = (token) => {
  STORE.dispatch(setToken(token));
};
