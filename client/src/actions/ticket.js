import api from '../utils/api';
import {
    GET_TICKETS,
    SEND_ORDERS,
    ORDER_SUCCESS
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

export const sendOrders = (history, email, attendees) => async dispatch => {
    try {
        console.log('attendees', email, attendees);
        const res = await api.post('/tickets/orders', { email, attendees });
        console.log('orders', res.data.result);        
        if (res.data.result) {
            dispatch({
                type: ORDER_SUCCESS,
                payload: res.data.result
            })
            history.push('/done');
        }
    } catch (err) {
        console.log(err.message);
    }
}