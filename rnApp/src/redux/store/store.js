import { createStore, combineReducers } from "redux";

import connection from "../reducers/connection";
import profil from "../reducers/profil";

const mainReducers = combineReducers({ connection, profil });

export default STORE = createStore(mainReducers);
// Store of the app
// All the state shared in the app are in the store
