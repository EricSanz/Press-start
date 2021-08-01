import actionTypes from '../actions/actionTypes';

export default function videogameReducer(state = {}, action) {
    let newState = null;
    let platformVideogames;
    let filteredVideogames;
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
            filteredVideogames = state.videogamesList.filter((videogame) => (
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
            console.log(action.videogames);
                switch (action.videogames) {
                    case "ps4":
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.ps4 === true
                        ))
                    break;
                    case "ps5":
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.ps5 === true
                        ))
                    break;
                    case "xboxOne":
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.xboxOne === true
                        ))
                    break;
                    case "xboxSeriesSX":
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.xboxSeriesSX === true
                        ))
                    break;
                    case "nintendoSwitch":
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.nintendoSwitch === true
                        ))
                    break;
                    case "pc":
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.pc === true
                        ))
                    break;
                    case "allPlatforms":
                        filteredVideogames = state.videogamesList
                    break;
                    // case "onSale":
                    //     platformVideogames = state.videogamesList.filter((videogame) => (
                    //         videogame.edition.sale === true
                    //     ))
                    // break;
                    default:
                    break;
                }
            console.log(filteredVideogames);
            newState = {
                ...state,
                loading: false,
                // filteredVideogameList: filteredVideogames,
                platformVideogamesList: filteredVideogames
            }
            break;
        case actionTypes.FILL_VIDEOGAME_BY_PLATFORM_LIST:
            newState = {
                ...state,
                loading: false,
                // filteredVideogameList: [],
                platformVideogamesList: [],
            };
            break;
        case actionTypes.FILTER_VIDEOGAME_BY_SALE:
            // let salesVideogames = [];
            const ps4Checked = document.getElementById('ps4');
            const ps5Checked = document.getElementById('ps5');
            switch (action.videogames) {
                case 'onSale':
                    if (ps4Checked) {
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.edition.sale === true && videogame.ps4 === true
                        ))
                    } else if (ps5Checked.checked) {
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.edition.sale === true && videogame.ps5 === true
                        ))
                    } else {
                        filteredVideogames = state.videogamesList.filter((videogame) => (
                            videogame.edition.sale === true
                        ))
                    }
                    break;
                case 'notSale':

                    break;
                default:
                    // filteredVideogames = []
                    break;
            }
            // salesVideogames = state.videogamesList.filter((videogame) => (
            //     videogame.edition.sale === true && videogame.ps4 === true
            // ))
            console.log(filteredVideogames);
            newState = {
                ...state,
                loading: false,
                salesVideogamesList: filteredVideogames
            }
            break;
        case actionTypes.FILL_VIDEOGAME_BY_SALE_LIST:
            newState = {
                ...state,
                loading: false,
                salesVideogamesList: []
            };
            break;
        default:
            newState = state;
            break;
    }

    return newState;
}