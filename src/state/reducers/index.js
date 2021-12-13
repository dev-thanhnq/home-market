import { combineReducers } from "redux";
import userReducers from "./userReducers";

const allReducers = combineReducers({
    userReducers
})

export default allReducers;