import { AUTHORIZED_USER } from "./../actions/api/person";

const defaultState = {
    id: undefined
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case AUTHORIZED_USER: {
            return {
                ...defaultState,
                id: action.authorizedUserId
            };
        }
        default: {
            return state;
        }
    }
}
