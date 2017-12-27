import { put } from "./../infrastructure/API";

export function createPersonGroup(groupId) {
    return new Promise(async function(fulfill, reject) {
        const path = `/persongroups/${groupId}`;
        const body = {
            name: "My group",
            userData: "Some data for the group"
        };
        try {
            const response = await put(path, body);
            fulfill(response);
        } catch (error) {
            if (error.response.status === 409) {
                console.log("conflict");
            }
            reject(error);
        }
    });
}
