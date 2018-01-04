import { get, post, put } from "./../infrastructure/API";

export const PERSON_GROUP_TRAINING_START =
    "personGroup/PERSON_GROUP_TRAINING_START";
export const PERSON_GROUP_TRAINING_START_ERROR =
    "personGroup/PERSON_GROUP_TRAINING_START_ERROR";
export const PERSON_GROUP_TRAINING_STATUS_ERROR =
    "personGroup/PERSON_GROUP_TRAINING_STATUS_ERROR";
export const PERSON_GROUP_TRAINING_STATUS_NOT_STARTED =
    "personGroup/PERSON_GROUP_TRAINING_STATUS_NOT_STARTED";
export const PERSON_GROUP_TRAINING_STATUS_RUNNING =
    "personGroup/PERSON_GROUP_TRAINING_STATUS_RUNNING";
export const PERSON_GROUP_TRAINING_STATUS_SUCCEEDED =
    "personGroup/PERSON_GROUP_TRAINING_STATUS_SUCCEEDED";
export const PERSON_GROUP_TRAINING_STATUS_FAILED =
    "personGroup/PERSON_GROUP_TRAINING_STATUS_FAILED";

/**
 * Start training for a person group
 *
 * @export trainPersonGroup
 * @param {string} personGroupId The group id to start training
 * @returns A function that dispatches an action to indicate training has started; otherwise, dispatches an action with the error message
 */
// https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395249
export function trainPersonGroup(personGroupId) {
    return async function(dispatch) {
        const path = `/persongroups/${personGroupId}/train`;
        try {
            const response = await dispatch(post(path));
            if (response && response.status === 202) {
                dispatch(trainingStarted());
            } else {
                throw new Error(
                    `Failed to start training for ${personGroupId} group.`
                );
            }
        } catch (error) {
            dispatch(trainingStartError(error.response.data.error.message));
        }
    };
}

function trainingStarted() {
    return {
        type: PERSON_GROUP_TRAINING_START
    };
}

function trainingStartError(message) {
    return {
        message: message,
        type: PERSON_GROUP_TRAINING_START_ERROR
    };
}

/**
 * Creates a person group
 *
 * @export createPersonGroup
 * @param {string} groupId The name of the group
 * @returns An empty fulfilled promise if successful; otherwise, a rejected promise with the error object
 */
// https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244
export function createPersonGroup(groupId) {
    return async function(dispatch) {
        const path = `/persongroups/${groupId}`;
        const body = {
            name: "My group",
            // Optional
            userData: "Some data for the group"
        };
        const response = await put(path, body);
        if (response && response.status === 200) {
            // Does nothing
        } else {
            throw new Error(
                "Failed to create the person group: invalid response."
            );
        }
    };
}

export function personGroupTrainingStatus(personGroupId) {
    return async function(dispatch) {
        const path = `/persongroups/${personGroupId}/training`;
        try {
            const response = await dispatch(get(path));
            if (
                response &&
                response.status === 200 &&
                response.data &&
                response.data.status
            ) {
                const status = response.data.status;
                if (status.match(/notstarted/)) {
                    dispatch(personGroupTrainingStatusNotStarted());
                } else if (status.match(/running/)) {
                    dispatch(personGroupTrainingStatusRunning());
                } else if (status.match(/succeeded/)) {
                    dispatch(personGroupTrainingStatusSucceeded());
                } else if (status.match(/failed/)) {
                    dispatch(personGroupTrainingStatusFailed());
                }
                // TODO Add unknown status
            } else {
                const message = `Failed to get status for person group ${personGroupId}`;
                dispatch(personGroupTrainingStatusError(message));
            }
        } catch (error) {
            dispatch(
                personGroupTrainingStatusError(
                    error.response.data.error.message
                )
            );
        }
    };
}

function personGroupTrainingStatusFailed() {
    return {
        message: "training failed",
        type: PERSON_GROUP_TRAINING_STATUS_FAILED
    };
}

function personGroupTrainingStatusSucceeded() {
    return {
        type: PERSON_GROUP_TRAINING_STATUS_SUCCEEDED
    };
}

function personGroupTrainingStatusRunning() {
    return {
        type: PERSON_GROUP_TRAINING_STATUS_RUNNING
    };
}

function personGroupTrainingStatusNotStarted() {
    return {
        type: PERSON_GROUP_TRAINING_STATUS_NOT_STARTED
    };
}

function personGroupTrainingStatusError(message) {
    return {
        message: message,
        type: PERSON_GROUP_TRAINING_STATUS_ERROR
    };
}
