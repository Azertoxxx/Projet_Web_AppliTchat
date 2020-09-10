import { TYPE_SET_CONNECTION } from "../actions/actions";

const initialState = {
  isConnected: false,
};

function connection(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case TYPE_SET_CONNECTION:
      nextState = { ...state, isConnected: action.value };
      return nextState || state;

    default:
      return state;
  }
}

export default connection;
