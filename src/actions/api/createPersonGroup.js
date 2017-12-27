import axios from "axios";
import Globals from "./../../config/Globals";

export async function createPersonGroup(groupId) {
    const path = "/persongroups/";
    const body = {
        name: "My group",
        userData: "Some data for the group"
    };
    const options = {
        baseURL: Globals.urls.apiBase,
        headers: {
            "Ocp-Apim-Subscription-Key": Globals.subscriptionKey
        },
        timeout: Globals.timeout
    };
    const requestObject = axios.create(options);
    try {
        const response = await requestObject.put(path + groupId, body);
    } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
            console.log("conflict");
        }
    }
}
