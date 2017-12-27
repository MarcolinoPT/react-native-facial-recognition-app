import { post } from "./../infrastructure/API";

export const PERSON_GROUP_TRAINING_START =
    "trainPersonGroup/PERSON_GROUP_TRAINING_START";
export const PERSON_GROUP_TRAINING_START_ERROR =
    "trainPersonGroup/PERSON_GROUP_TRAINING_START_ERROR";

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
