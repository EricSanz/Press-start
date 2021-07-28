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
            const filteredVideogames = state.videogamesList.filter((videogame) => (
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
            let platformVideogames = []; 
            console.log(action.videogames);
                switch (action.videogames) {
                    case "ps4":
                            state.videogamesList.map((videogame) => (
                                videogame.ps4 ? platformVideogames.push(videogame) : null
                            ))
                    break;
                    case "ps5":
                        state.videogamesList.map((videogame) => (
                            videogame.ps5 ? platformVideogames.push(videogame) : null
                        ))
                    break;
                    case "xboxOne":
                        state.videogamesList.map((videogame) => (
                            videogame.xboxOne ? platformVideogames.push(videogame) : null
                        ))
                    break;
                    case "xboxSeriesSX":
                        state.videogamesList.map((videogame) => (
                            videogame.xboxSeriesSX ? platformVideogames.push(videogame) : null
                        ))
                    break;
                    case "nintendoSwitch":
                        state.videogamesList.map((videogame) => (
                            videogame.nintendoSwitch ? platformVideogames.push(videogame) : null
                        ))
                    break;
                    case "pc":
                        state.videogamesList.map((videogame) => (
                            videogame.pc ? platformVideogames.push(videogame) : null
                        ))
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
                platformVideogames: []
            };
            break;
        default:
            newState = state;
            break;
    }

    return newState;
}