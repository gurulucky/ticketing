import api from '../utils/api';
import {
    GET_TICKETS,
    SEND_ORDERS,
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

export const sendOrders = (orders) => async dispatch => {
    try {
        const res = await api.post('/orders', { orders });
    } catch (err) {
        console.log(err.message);
    }
}