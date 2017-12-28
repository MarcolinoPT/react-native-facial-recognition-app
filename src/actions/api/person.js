import { get, post } from "./../infrastructure/API";

export const AUTHORIZED_USER = "addPersonFace/AUTHORIZED_USER";

/**
 * Adds a face to a specific person
 *
 * @export addPersonFace
 * @param {string} personGroupId The group id where the person belongs
 * @param {string} personId The person id to associate the face
 * @param {string} faceImagePath The path of the face image
 * @returns A function that dispatches the persisted face id; otherwise, dispatches an error message
 */
// https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523b
export function addPersonFace(personGroupId, personId, faceImagePath) {
    return async function(dispatch) {
        const path = `/persongroups/${personGroupId}/persons/${personId}/persistedFaces`;
        const body = {
            // TODO Change url to dynamic
            url:
                "https://media-exp2.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA3ZAAAAJDhmNWYyMmY4LTUyZDUtNGQ5OS1hNzRiLWJkNjIwMzMyOTljNg.jpg"
        };
        try {
            const response = await dispatch(post(path, body));
            if (
                response &&
                response.status === 200 &&
                response.data &&
                response.data.persistedFaceId
            ) {
                dispatch(authorizedUser(response.data.persistedFaceId));
            } else {
                throw new Error(
                    `Failed to add face to person id ${personId} from group id ${personGroupId}`
                );
            }
        } catch (error) {
            console.dir(error.response.data.error.code);
            // TODO Dispatch an error
            // dispatch()
        }
    };
}

function authorizedUser(persistedFaceId) {
    return {
        authorizedUserId: persistedFaceId,
        type: AUTHORIZED_USER
    };
}

/**
 * Creates a person for a given person group id
 *
 * @export createPerson
 * @param {string} personGroupId The person group id where to add the person
 * @param {string} name The name of the person to add
 * @returns A fulfilled promise containing the person id; otherwise, a rejected promise with the error object
 */
// https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523c
export function createPerson(personGroupId, name) {
    return new Promise(async function(fulfill, reject) {
        const path = `persongroups/${personGroupId}/persons`;
        const body = {
            name: name,
            // Optional field
            userData: "Created through FacialRecognitionApp"
        };
        try {
            const response = await post(path, body);
            if (
                response &&
                response.status === 200 &&
                response.data &&
                response.data.personId
            ) {
                fulfill(response.data.personId);
            } else {
                throw new Error(
                    `Failed to create person ${name} on group ${personGroupId}.`
                );
            }
        } catch (error) {
            reject(error);
        }
    });
}

/**
 *
 *
 * @export
 * @param {any} personGroupId
 * @param {any} personId
 * @returns
 */
// https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523f
export function getPerson(personGroupId, personId) {
    return async function(dispatch) {
        const path = `/persongroups/${personGroupId}/persons/${personId}`;
        try {
            const response = await dispatch(get(path));
            if (response && response.status === 200 && response.data) {
                return response.data;
            } else {
                // If something unexpected
                return "Unknown";
            }
        } catch (error) {}
    };
}
