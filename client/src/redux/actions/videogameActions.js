import axios from 'axios';
import actionTypes from './actionTypes';
import constants from '../../constants/dbUrls';

const {
    baseUrl,
    videogamesUrl,
} = constants;

function setLoading() {
    return {
        type: actionTypes.SET_LOADING,
    };
};

export function requestVideogames() {
    return async (dispatch) => {
        dispatch(setLoading());
        const backEndPoint = `${baseUrl}${videogamesUrl}`;
        try {
            const videogames = await axios.get(backEndPoint);
            dispatch(loadVideogamesSuccess(videogames.data));
        } catch (dataError) {
            dispatch(loadVideogamesError(dataError));
        }
    };
};

function loadVideogamesSuccess(data) {
    return {
        type: actionTypes.LOAD_VIDEOGAMES,
        data,
    };
};

function loadVideogamesError(error) {
    return {
        type: actionTypes.LOAD_VIDEOGAMES_ERROR,
        error,
    };
};