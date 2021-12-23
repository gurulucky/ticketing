import api from '../utils/api';
import {
    GET_VENUE,
    GET_VENUES
} from './types';

export const getVenues = () => async dispatch => {
    try {
        const res = await api.get('/venues/all');
        console.log(res.data);
        dispatch({
            type: GET_VENUES,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const getVenue = (id) => async dispatch => {
    try {
        const res = await api.get('/venues', { params: { id } });
        console.log(res.data);
        dispatch({
            type: GET_VENUE,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}