import {
    GET_CATEGORIES
} from '../actions/types';

const initialState = {
    categories: [],
}

function categoryReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            };
        default:
            return state;
    }
}

export default categoryReducer;