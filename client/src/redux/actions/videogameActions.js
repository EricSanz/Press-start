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

function loadVideogamesSuccess(videogamesList) {
    return {
        type: actionTypes.LOAD_VIDEOGAMES,
        videogamesList,
    };
};

function loadVideogamesError(error) {
    return {
        type: actionTypes.LOAD_VIDEOGAMES_ERROR,
        error,
    };
};

export function loadVideogames() {
    return async (dispatch) => {
        dispatch(setLoading());
        const backEndPoint = `${baseUrl}${videogamesUrl}`;
        try {
            const videogamesList = await axios.get(backEndPoint);
            console.log(videogamesList)
            dispatch(loadVideogamesSuccess(videogamesList.data));
        } catch (error) {
            dispatch(loadVideogamesError(error));
        }
    };
};