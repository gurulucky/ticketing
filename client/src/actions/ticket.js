import api from '../utils/api';
import {
    GET_TICKETS,
    SET_ORDERS,
} from './types';

export const getTickets = (eventId) => async dispatch => {
    try {
        const res = await api.get('/tickets', { params: { eventId } });
        console.log(res.data);
        dispatch({
            type: GET_TICKETS,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const setOrders = (orders) => async dispatch => {
    dispatch({
        type: SET_ORDERS,
        payload: orders
    })
}