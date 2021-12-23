import {
    GET_HOME_EVENTS,
    GET_EVENTS,
    GET_EVENT,
    SET_SEARCH_DATA
} from '../actions/types';

const initialState = {
    homeEvents: [],
    events: [],
    currentEvent: null,
    searchData: ''
}

function eventReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_HOME_EVENTS:
            // console.log("payload",payload);
            return {
                ...state,
                homeEvents: payload
            };
        case GET_EVENTS:
            return {
                ...state,
                events: payload
            };
        case GET_EVENT:
            return {
                ...state,
                currentEvent: payload
            };
        case SET_SEARCH_DATA:
            return {
                ...state,
                searchData: payload
            }
        default:
            return state;
    }
}

export default eventReducer;