import { post } from "./../infrastructure/API";

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
