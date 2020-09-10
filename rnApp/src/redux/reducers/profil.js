import { TYPE_SET_PROFIL_INFOS, TYPE_SET_TOKEN } from "../actions/actions";

const initialState = {
  phoneNumber: "",
  name: "",
  bio: "",
  token: "",
};

function profil(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case TYPE_SET_PROFIL_INFOS:
      nextState = {
        ...state,
        phoneNumber: action.value.phoneNumber,
        name: action.value.name,
        bio: action.value.bio,
      };
      return nextState || state;

    case TYPE_SET_TOKEN:
      nextState = { ...state, token: action.value };
      return nextState || state;

    default:
      return state;
  }
}

export default profil;
