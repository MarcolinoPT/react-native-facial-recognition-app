import { userRegisteredGetFromStorage } from "./../user/creation";

export function init() {
    return async function(dispatch) {
        await dispatch(userRegisteredGetFromStorage());
    };
}
