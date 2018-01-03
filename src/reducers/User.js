import { AUTHORIZED_USER } from "./../actions/api/person";
import {
    AUTHENTICATED_PERSON,
    AUTHENTICATION_END,
    AUTHENTICATION_START,
    LOGOUT
} from "./../actions/user/authentication";

const defaultState = {
    id: undefined,
    isAuthenticated: false,
    isAuthenticating: false,
    person: undefined
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case AUTHENTICATED_PERSON: {
            return {
                ...defaultState,
                isAuthenticated: true,
                person: action.person
            };
        }
        case AUTHENTICATION_END: {
            return {
                ...state,
                isAuthenticating: false
            };
        }
        case AUTHENTICATION_START: {
            return {
                ...state,
                isAuthenticating: true
            };
        }
        case AUTHORIZED_USER: {
            return {
                ...defaultState,
                id: action.authorizedUserId
            };
        }
        case LOGOUT: {
            return { ...defaultState };
        }
        default: {
            return state;
        }
    }
}
