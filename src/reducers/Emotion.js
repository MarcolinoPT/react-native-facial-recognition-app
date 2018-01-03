import {
    EMOTION_FIND_FINISH,
    EMOTION_FIND_START,
    EMOTION_FOUND
} from "./../actions/api/emotion";

const defaultState = {
    analyzing: false,
    imagePath: undefined,
    name: undefined,
    score: 0,
    timestamp: 0
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case EMOTION_FIND_FINISH: {
            return {
                ...state,
                analyzing: false
            };
        }
        case EMOTION_FIND_START: {
            return {
                ...state,
                analyzing: true
            };
        }
        case EMOTION_FOUND: {
            console.log(action);
            return {
                ...state,
                imagePath: action.imagePath,
                name: action.emotion.name,
                score: action.emotion.score,
                timestamp: Date.now()
            };
        }
        default: {
            return state;
        }
    }
}
