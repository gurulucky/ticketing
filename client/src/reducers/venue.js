import {
    GET_VENUES,
    GET_VENUE
} from '../actions/types';

const initialState = {
    venues: [],
    currentVenue: null
}

function venueReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_VENUES:
            return {
                ...state,
                venues: payload
            };
        case GET_VENUE:
            return {
                ...state,
                currentVenue: payload
            };
        default:
            return state;
    }
}

export default venueReducer;