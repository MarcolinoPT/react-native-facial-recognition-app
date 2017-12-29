import Globals from "./../../config/Globals";
import RNFetchBlob from "react-native-fetch-blob";

// https://westus.dev.cognitive.microsoft.com/docs/services/5639d931ca73072154c1ce89/operations/563b31ea778daf121cc3a5fa
export function recognition(imagePath) {
    return async function() {
        const method = "POST";
        const url =
            "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize";
        try {
            const response = await RNFetchBlob.fetch(
                method,
                url,
                {
                    "Ocp-Apim-Subscription-Key":
                        Globals.subscriptionKey.emotionAPI,
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
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
}
