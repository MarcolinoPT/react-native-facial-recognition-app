import { put } from "./../infrastructure/API";

/**
 * Creates a person group
 *
 * @export createPersonGroup
 * @param {string} groupId The name of the group
 * @returns An empty fulfilled promise if successful; otherwise, a rejected promise with the error object
 */
// https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244
export function createPersonGroup(groupId) {
    return new Promise(async function(fulfill, reject) {
        const path = `/persongroups/${groupId}`;
        const body = {
            name: "My group",
            // Optional
            userData: "Some data for the group"
        };
        try {
            const response = await put(path, body);
            if (response && response.status === 200) {
                fulfill();
            } else {
                throw new Error(
                    "Failed to create the person group: invalid response."
                );
            }
        } catch (error) {
            reject(error);
        }
    });
}
