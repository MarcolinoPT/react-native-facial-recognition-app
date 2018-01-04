import {
    PERSON_GROUP_TRAINING_STATUS_ERROR,
    PERSON_GROUP_TRAINING_STATUS_FAILED,
    PERSON_GROUP_TRAINING_STATUS_NOT_STARTED,
    PERSON_GROUP_TRAINING_STATUS_RUNNING,
    PERSON_GROUP_TRAINING_STATUS_SUCCEEDED,
    PERSON_GROUP_TRAINING_START,
    PERSON_GROUP_TRAINING_START_ERROR
} from "./../actions/api/personGroup";
import { USER_CREATE_SUCCEEDED } from "./../actions/user/creation";

const defaultState = {
    isTraining: false,
    error: undefined,
    trainingSucceeded: false
};

export default function(state = defaultState, action) {
    console.log(action);
    switch (action.type) {
        case USER_CREATE_SUCCEEDED:
        case PERSON_GROUP_TRAINING_STATUS_NOT_STARTED: {
            return { ...defaultState };
        }
        case PERSON_GROUP_TRAINING_STATUS_RUNNING:
        case PERSON_GROUP_TRAINING_START: {
            return {
                ...defaultState,
                isTraining: true
            };
        }
        case PERSON_GROUP_TRAINING_STATUS_FAILED:
        case PERSON_GROUP_TRAINING_STATUS_ERROR:
        case PERSON_GROUP_TRAINING_START_ERROR: {
            return {
                ...state,
                error: action.message
            };
        }
        case PERSON_GROUP_TRAINING_STATUS_SUCCEEDED: {
            return {
                ...defaultState,
                trainingSucceeded: true
            };
        }
        default: {
            return state;
        }
    }
}
