import { combineReducers } from "redux";
import PersonGroup from "./PersonGroup";
import User from "./User";

export default combineReducers({
    personGroup: PersonGroup,
    user: User
});
