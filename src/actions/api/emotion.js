import Globals from "./../../config/Globals";
import RNFetchBlob from "react-native-fetch-blob";
import _ from "lodash";

export const EMOTION_FIND_START = "emotion/EMOTION_FIND_START";
export const EMOTION_FIND_FINISH = "emotion/EMOTION_FIND_FINISH";
export const EMOTION_FOUND = "emotion/EMOTION_FOUND";

// https://westus.dev.cognitive.microsoft.com/docs/services/5639d931ca73072154c1ce89/operations/563b31ea778daf121cc3a5fa
export function recognition(imagePath) {
    return async function(dispatch) {
        dispatch(emotionFindStart());
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
                const emotions = JSON.parse(response.data);
                for (const emotion of emotions) {
                    if (emotion.scores) {
                        let bestEmotion = {
                            name: undefined,
                            score: 0
                        };
                        for (let emotionName in emotion.scores) {
                            const emotionScore = emotion.scores[emotionName];
                            if (emotionScore > bestEmotion.score) {
                                bestEmotion.name = emotionName;
                                bestEmotion.score = emotionScore;
                            }
                        }
                        console.log(bestEmotion.name + " " + bestEmotion.score);
                        dispatch(emotionFound(bestEmotion, imagePath));
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(emotionFindFinish());
    };
}

function emotionFindStart() {
    return {
        type: EMOTION_FIND_START
    };
}

function emotionFindFinish() {
    return {
        type: EMOTION_FIND_FINISH
    };
}

function emotionFound(emotion, imagePath) {
    return {
        emotion: emotion,
        imagePath: imagePath,
        type: EMOTION_FOUND
    };
}
