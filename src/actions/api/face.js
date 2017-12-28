import Globals from "./../../config/Globals";
import RNFetchBlob from "react-native-fetch-blob";
import { getFaceIds } from "./face.helper";

export function detect(imagePath) {
    return function(dispatch) {
        const method = "POST";
        const url = `${Globals.urls.apiBase}/detect?returnFaceId=true`;
        RNFetchBlob.fetch(
            method,
            url,
            {
                "Ocp-Apim-Subscription-Key": Globals.subscriptionKey,
                "Content-Type": "application/octet-stream"
            },
            RNFetchBlob.wrap(imagePath)
        )
            .then(response => {
                console.log(response);
                if (
                    response &&
                    response.respInfo &&
                    response.respInfo.status &&
                    response.respInfo.status === 200 &&
                    response.data
                ) {
                    // TODO Handle successful response
                    console.log(getFaceIds(JSON.parse(response.data)));
                } else {
                    // TODO Handle unknown response
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
}
