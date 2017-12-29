import axios from "axios";
import Globals from "./../../config/Globals";

function performRequest(request) {
    return async function(dispatch) {
        const options = {
            baseURL: Globals.urls.apiBase,
            headers: {
                "Ocp-Apim-Subscription-Key": Globals.subscriptionKey.faceAPI
            },
            timeout: Globals.timeout
        };
        const requestObject = axios.create(options);
        return await request(requestObject);
    };
}

export function post(path, params) {
    return performRequest(requestObject => {
        return requestObject.post(path, params);
    });
}

export function put(path, params) {
    return performRequest(requestObject => {
        return requestObject.put(path, params);
    });
}

export function get(path) {
    return performRequest(requestObject => {
        return requestObject.get(path);
    });
}
