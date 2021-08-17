import axios from 'axios';
import actionTypes from './actionTypes';
import constants from '../../constants/dbUrls';

const {
    baseUrl,
    videogamesUrl,
    videogameUrl,
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

function loadOneVideogameSuccess(videogame) {
    return {
        type: actionTypes.LOAD_VIDEOGAME,
        videogame,
    };
};

function loadOneVideogameError(error) {
    return {
        type: actionTypes.LOAD_VIDEOGAME_ERROR,
        error,
    };
};

export function loadOneVideogame(videogameId) {
    return async (dispatch) => {
        dispatch(setLoading());
        const backEndPoint = `${baseUrl}${videogameUrl}${videogameId}`;
        try {
            const videogame = await axios.get(backEndPoint);
            console.log(videogame);
            dispatch(loadOneVideogameSuccess(videogame.data))
        } catch (error) {
            dispatch(loadOneVideogameError(error))
        }
    }
}

export function filterVideogameByName(videogameName) {
    return {
      type: actionTypes.FILTER_VIDEOGAME_LIST,
      videogameName,
    };
}
  
export function fillVideogameList() {
    return {
      type: actionTypes.FILL_VIDEOGAME_LIST,
    };
}

export function filterVideogameByPlatform(videogames) {
    return {
        type: actionTypes.FILTER_VIDEOGAME_BY_PLATFORM,
        videogames,
    }
}

export function fillVideogameByPlatformList() {
    return {
        type: actionTypes.FILL_VIDEOGAME_BY_PLATFORM_LIST,
    };
}

export function fillFullVideogameList() {
    return {
        type: actionTypes.FILL_FULL_VIDEOGAME_LIST,
    };
}