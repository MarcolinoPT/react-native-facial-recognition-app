import {
    addPersonFace,
    createPersonGroup,
    createPerson,
    trainPersonGroup,
    personGroupTrainingStatus
} from "./../api";
import Globals from "./../../config/Globals";
import { AsyncStorage } from "react-native";

export const USER_CREATE_START = "creation/USER_CREATE_START";
export const USER_CREATE_ERROR = "creation/USER_CREATE_ERROR";
export const USER_CREATE_SUCCEEDED = "creation/USER_CREATE_SUCCEEDED";
const USER_REGISTERED_KEY = "USER_REGISTERED_KEY";

export function createUser(name, images) {
    return async function(dispatch, getState) {
        dispatch(createUserStart());
        try {
            const personId = await dispatch(
                createPerson(Globals.personGroupId, name)
            );
            if (personId) {
                console.log("personId ", personId);
                for (const image of images) {
                    console.log(image);
                    const persistentFaceId = await dispatch(
                        addPersonFace(Globals.personGroupId, personId, image)
                    );
                    console.log(persistentFaceId);
                }
                dispatch(trainPersonGroup(Globals.personGroupId));
                dispatch(getTrainingStatus());
            }
        } catch (error) {
            console.log(error);
            // TODO Dispatch delete of group
            dispatch(createUserError());
        }
    };
}

function createUserStart() {
    return {
        type: USER_CREATE_START
    };
}

function createUserError() {
    return {
        type: USER_CREATE_ERROR
    };
}

function getTrainingStatus() {
    return async function(dispatch, getState) {
        await dispatch(personGroupTrainingStatus(Globals.personGroupId));
        const { personGroup } = getState();
        if (personGroup.isTraining && personGroup.error === undefined) {
            const interval = 1000;
            setTimeout(() => {
                dispatch(getTrainingStatus());
            }, interval);
        } else if (personGroup.trainingSucceeded) {
            userRegisteredSetToStorage();
            dispatch(createUserSucceeded());
        }
    };
}

function createUserSucceeded() {
    return {
        type: USER_CREATE_SUCCEEDED
    };
}

function userRegisteredSetToStorage() {
    return AsyncStorage.setItem(USER_REGISTERED_KEY, JSON.stringify(true))
        .then(() => {
            console.log("key set");
        })
        .catch(error => {
            console.log(error);
        });
}

export function userRegisteredGetFromStorage() {
    return function(dispatch) {
        return AsyncStorage.getItem(USER_REGISTERED_KEY)
            .then(isRegistered => {
                if (isRegistered) {
                    dispatch(createUserSucceeded());
                }
            })
            .catch(error => {
                console.log(console.error);
                // Do not dispatch anything
            });
    };
}
