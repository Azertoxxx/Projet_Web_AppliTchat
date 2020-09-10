import { createItem } from "./utilities";

// Stack register
import MenuRegister from "../screens/MenuRegister";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const MENU_REGISTER = createItem("menuRegister", MenuRegister);
const SIGN_IN = createItem("SignIn", SignIn);
const SIGN_UP = createItem("SignUp", SignUp);

export const LINK_STACK_REGISTER = {
  default: MENU_REGISTER,
  list: [SIGN_IN, SIGN_UP],
};
