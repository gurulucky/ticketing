import api from '../utils/api';
import {
    GET_HOME_EVENTS,
    GET_EVENTS,
    GET_EVENT,
    SET_SEARCH_DATA
} from './types';

export const getHomeEvents = () => async dispatch => {
    try {
        const res = await api.get('/events/home');
        dispatch({
            type: GET_HOME_EVENTS,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const getEvents = (searchData) => async dispatch => {
    try {
        console.log(searchData);
        const res = await api.get('/events/search', { params: searchData });
        console.log(res.data);
        dispatch({
            type: GET_EVENTS,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const getEventsByUser = (searchData) => async dispatch => {
    try {
        const res = await api.get('events/byuser', { params: searchData });
        console.log('byuser', res.data);
        dispatch({
            type: GET_EVENTS,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const getEvent = (id) => async dispatch => {
    try {
        const res = await api.get('/events', { params: { id } });
        console.log(res.data);
        dispatch({
            type: GET_EVENT,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const setSearchData = (searchData) => async dispatch => {
    dispatch({
        type: SET_SEARCH_DATA,
        payload: searchData
    })
}