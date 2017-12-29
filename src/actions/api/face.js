import { post } from "./../infrastructure/API";
import Globals from "./../../config/Globals";
import RNFetchBlob from "react-native-fetch-blob";
import { getFaceIds } from "./face.helper";

/**
 *
 *
 * @export
 * @param {any} imagePath
 * @returns
 */
// https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236
export function detect(imagePath) {
    return async function() {
        const method = "POST";
        const url = `${Globals.urls.apiBase}/detect?returnFaceId=true`;
        try {
            const response = await RNFetchBlob.fetch(
                method,
                url,
                {
                    "Ocp-Apim-Subscription-Key":
                        Globals.subscriptionKey.faceAPI,
                    "Content-Type": "application/octet-stream"
                },
                RNFetchBlob.wrap(imagePath)
            );
            console.log(response);
            if (
                response &&
                response.respInfo &&
                response.respInfo.status &&
                response.respInfo.status === 200 &&
                response.data
            ) {
                // Return the parsed ids
                // to be handled by the caller
                return getFaceIds(JSON.parse(response.data));
            } else {
                // If an unknown response is received
                // we return an empty array of ids
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };
}

/**
 *
 *
 * @export
 * @param {any} personGroupId
 * @param {any} faceIds
 * @returns
 */
// https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239
export function identify(personGroupId, faceIds) {
    return async function(dispatch) {
        const path = `/identify`;
        const body = {
            faceIds: faceIds,
            personGroupId: personGroupId
        };
        try {
            const response = await dispatch(post(path, body));
            if (response && response.status === 200) {
                return response.data;
            } else {
                // Return an empty array if an
                // unknown response is received
                return [];
            }
        } catch (error) {
            console.log(error.message);
        }
    };
}
