import {
    GET_TICKETS,
    ORDER_SUCCESS
} from '../actions/types';

const initialState = {
    tickets: [],
    orders: []
}

function ticketReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TICKETS:
            // console.log("payload",payload);
            return {
                ...state,
                tickets: payload
            };
        case ORDER_SUCCESS:
            return {
                ...state,
                orders: payload
            }
        default:
            return state;
    }
}

export default ticketReducer;