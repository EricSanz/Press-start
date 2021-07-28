import actionTypes from '../actions/actionTypes';

export default function videogameReducer(state = {}, action) {
    let newState = null;
    switch (action.type) {
        case actionTypes.SET_LOADING:
            newState = { ...state, loading: true };
            break;

        case actionTypes.LOAD_VIDEOGAMES:
            newState = {
                ...state,
                loading: false,
                videogamesList: action.videogamesList,
            };
            break;

        case actionTypes.LOAD_VIDEOGAMES_ERROR:
            newState = {
                ...state,
                loading: false,
                error: action.error
            };
            break;
        case actionTypes.LOAD_VIDEOGAME:
            newState = {
                ...state,
                loading: false,
                videogame: action.videogame,
            };
            break;
        case actionTypes.LOAD_VIDEOGAME_ERROR:
            newState = {
                loading: false,
                error: action.error
            };
            break;
        case actionTypes.FILTER_VIDEOGAME_LIST:
            let filteredVideogames = state.videogamesList.filter((videogame) => (
                videogame.game.first_title.includes(action.videogameName)
            ))
            newState = {
                ...state,
                loading: false,
                filteredVideogameList: filteredVideogames
            };
            break;
        case actionTypes.FILL_VIDEOGAME_LIST:
            newState = {
                ...state,
                loading: false,
                filteredVideogameList: state.videogamesList
            };
            break;
        case actionTypes.FILTER_VIDEOGAME_BY_PLATFORM:
            let platformVideogames;
            console.log(action.videogames);
                switch (action.videogames) {
                    case "ps4":
                        platformVideogames = state.videogamesList.filter((videogame) => (
                            videogame.ps4 === true
                        ))
                    break;
                    case "ps5":
                        platformVideogames = state.videogamesList.filter((videogame) => (
                            videogame.ps5 === true
                        ))
                    break;
                    case "xboxOne":
                        platformVideogames = state.videogamesList.filter((videogame) => (
                            videogame.xboxOne === true
                        ))
                    break;
                    case "xboxSeriesSX":
                        platformVideogames = state.videogamesList.filter((videogame) => (
                            videogame.xboxSeriesSX === true
                        ))
                    break;
                    case "nintendoSwitch":
                        platformVideogames = state.videogamesList.filter((videogame) => (
                            videogame.nintendoSwitch === true
                        ))
                    break;
                    case "pc":
                        platformVideogames = state.videogamesList.filter((videogame) => (
                            videogame.pc === true
                        ))
                    break;
                    case "allPlatforms":
                        platformVideogames = state.videogamesList
                    break;
                    default:
                    break;
                }
            console.log(platformVideogames);
            newState = {
                ...state,
                loading: false,
                platformVideogames: platformVideogames
            }
            break;
        case actionTypes.FILL_VIDEOGAME_BY_PLATFORM_LIST:
            newState = {
                ...state,
                loading: false,
                filteredVideogameList: []
            };
            break;
        default:
            newState = state;
            break;
    }

    return newState;
}