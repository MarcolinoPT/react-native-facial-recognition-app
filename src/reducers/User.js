import { AUTHORIZED_USER } from "./../actions/api/person";
import {
    AUTHENTICATED_PERSON,
    AUTHENTICATION_END,
    AUTHENTICATION_START,
    LOGOUT
} from "./../actions/user/authentication";
import {
    USER_CREATE_START,
    USER_CREATE_ERROR,
    USER_CREATE_SUCCEEDED
} from "./../actions/user/creation";

const defaultState = {
    creationError: false,
    id: undefined,
    isAuthenticated: false,
    isAuthenticating: false,
    isCreating: false,
    isRegistered: false,
    person: undefined
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case AUTHENTICATED_PERSON: {
            return {
                ...defaultState,
                isAuthenticated: true,
                isRegistered: true,
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
            return {
                ...defaultState,
                isRegistered: true
            };
        }
        case USER_CREATE_START: {
            return {
                ...state,
                creationError: false,
                isCreating: true
            };
        }
        case USER_CREATE_ERROR: {
            return {
                ...state,
                creationError: true,
                isCreating: false
            };
        }
        case USER_CREATE_SUCCEEDED: {
            return {
                ...state,
                creationError: false,
                isCreating: false,
                isRegistered: true
            };
        }
        default: {
            return state;
        }
    }
}
