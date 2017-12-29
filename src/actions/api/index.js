import { recognition } from "./emotion";
import { detect, identify } from "./face";
import { addPersonFace, createPerson, getPerson } from "./person";
import {
    createPersonGroup,
    personGroupTrainingStatus,
    trainPersonGroup
} from "./personGroup";

export {
    addPersonFace,
    createPerson,
    createPersonGroup,
    detect,
    getPerson,
    identify,
    personGroupTrainingStatus,
    recognition,
    trainPersonGroup
};
