import { get, post } from "./../infrastructure/API";
import RNFetchBlob from "react-native-fetch-blob";
import Globals from "./../../config/Globals";

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
        const method = "POST";
        const path = `/persongroups/${personGroupId}/persons/${personId}/persistedFaces`;
        const url = Globals.urls.apiBase + path;
        console.log(url);
        const response = await RNFetchBlob.fetch(
            method,
            url,
            {
                "Ocp-Apim-Subscription-Key": Globals.subscriptionKey.faceAPI,
                "Content-Type": "application/octet-stream"
            },
            RNFetchBlob.wrap(faceImagePath)
        );
        console.log(response);
        if (
            response &&
            response.respInfo &&
            response.respInfo.status &&
            response.respInfo.status === 200 &&
            response.data
        ) {
            console.log(response.data);
            return JSON.parse(response.data).persistedFaceId;
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
    return async function(dispatch) {
        const path = `persongroups/${personGroupId}/persons`;
        const body = {
            name: name,
            // Optional field
            userData: "Created through FacialRecognitionApp"
        };
        const response = await dispatch(post(path, body));
        console.log(response);
        if (
            response &&
            response.status === 200 &&
            response.data &&
            response.data.personId
        ) {
            return response.data.personId;
        } else {
            throw new Error(
                `Failed to create person ${name} on group ${personGroupId}.`
            );
        }
    };
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
        const defaultPerson = {
            personId: undefined,
            persistedFaceIds: [],
            name: "J. Doe",
            userData: undefined
        };
        const path = `/persongroups/${personGroupId}/persons/${personId}`;
        try {
            const response = await dispatch(get(path));
            if (response && response.status === 200 && response.data) {
                return response.data;
            } else {
                // If something unexpected
                return defaultPerson;
            }
        } catch (error) {
            // TODO Dispatch error state to reducer
            return defaultPerson;
        }
    };
}
