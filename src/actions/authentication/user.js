import { detect, identify, getPerson } from "./../api";
import Globals from "./../../config/Globals";
import { getPersonId } from "./user.helper";

export function login(imageCaptured) {
    return async function(dispatch) {
        try {
            const faceIds = await dispatch(detect(imageCaptured));
            if (faceIds && faceIds.length > 0) {
                const identities = await dispatch(
                    identify(Globals.personGroupId, faceIds)
                );
                if (identities.length > 0) {
                    const personId = getPersonId(identities);
                    if (personId) {
                        const person = await dispatch(
                            getPerson(Globals.personGroupId, personId)
                        );
                        console.log(person.name);
                    } else {
                        console.log("Person id not found!");
                    }
                } else {
                    console.log("Unable to understand identities");
                    console.log(identities);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
}
