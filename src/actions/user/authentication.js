import { detect, identify, getPerson } from "./../api";
import Globals from "./../../config/Globals";
import { getPersonId } from "./authentication.helper";

export const AUTHENTICATED_PERSON = "authentication/AUTHENTICATED_PERSON";
export const AUTHENTICATION_START = "authentication/AUTHENTICATION_START";
export const AUTHENTICATION_END = "authentication/AUTHENTICATION_END";
export const LOGOUT = "authentication/LOGOUT";

export function login(imageCaptured) {
    return async function(dispatch) {
        dispatch(authenticationStart());
        try {
            const faceIds = await dispatch(detect(imageCaptured));
            if (faceIds && faceIds.length > 0) {
                const identities = await dispatch(
                    identify(Globals.personGroupId, faceIds)
                );
                if (identities.length > 0) {
                    const personId = getPersonId(identities);
                    if (personId) {
                        const person = await dispatch(
                            getPerson(Globals.personGroupId, personId)
                        );
                        if (person && personId) {
                            dispatch(authenticatedPerson(person));
                        }
                    } else {
                        console.log("Person id not found!");
                    }
                } else {
                    console.log("Unable to understand identities");
                    console.log(identities);
                }
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(authenticationEnd());
    };
}

function authenticationStart() {
    return {
        type: AUTHENTICATION_START
    };
}

function authenticationEnd() {
    return {
        type: AUTHENTICATION_END
    };
}

function authenticatedPerson(person) {
    return {
        person: person,
        type: AUTHENTICATED_PERSON
    };
}

export function logout() {
    return function(dispatch) {
        dispatch({
            type: LOGOUT
        });
    };
}
