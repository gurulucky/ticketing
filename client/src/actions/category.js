import api from '../utils/api';
import {
    GET_CATEGORIES
} from './types';

export const getCategories = () => async dispatch => {
    try {
        const res = await api.get('/categories');
        console.log(res.data);
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}