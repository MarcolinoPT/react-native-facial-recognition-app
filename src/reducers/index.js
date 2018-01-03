import { combineReducers } from "redux";
import Emotion from "./Emotion";
import PersonGroup from "./PersonGroup";
import User from "./User";

export default combineReducers({
    emotion: Emotion,
    personGroup: PersonGroup,
    user: User
});
