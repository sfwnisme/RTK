import { combineReducers } from "redux";
import cakeReducer from "./cake/cakeReducer";
import icecreamReducer from "./icecream/icecreamReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
  users: userReducer,
});

export default rootReducer;
