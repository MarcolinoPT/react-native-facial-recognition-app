import { detect, identify } from "./../api";
import Globals from "./../../config/Globals";

// TODO Add login function through captured image from camera
export function login(imageCaptured) {
    return async function(dispatch) {
        try {
            const faceIds = await dispatch(detect(imageCaptured));
            if (faceIds && faceIds.length > 0) {
                // TODO Call identify
                dispatch(identify(Globals.personGroupId, faceIds));
            }
        } catch (error) {
            console.log(error);
        }
    };
}
