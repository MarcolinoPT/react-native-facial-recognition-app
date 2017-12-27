import {
    PERSON_GROUP_TRAINING_START,
    PERSON_GROUP_TRAINING_START_ERROR
} from "./../actions/api/trainPersonGroup";

const defaultState = {
    isTraining: false,
    error: undefined
};

export default function(state = defaultState, action) {
    console.log(action);
    switch (action.type) {
        case PERSON_GROUP_TRAINING_START: {
            return {
                ...defaultState,
                isTraining: true
            };
        }
        case PERSON_GROUP_TRAINING_START_ERROR: {
            return {
                ...state,
                error: action.message
            };
        }
        default: {
            return state;
        }
    }
}
