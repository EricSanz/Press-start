/* eslint-disable no-sequences */
import actionTypes from '../actions/actionTypes';

export default function videogameReducer(state = {}, action) {
    let newState = null;
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
            const ps4Checked = document.getElementById('ps4');
            const ps5Checked = document.getElementById('ps5');
            const xboxOneChecked = document.getElementById('xboxOne');
            const xboxSeriesSXChecked = document.getElementById('xboxSeriesSX');
            const nintendoSwitchChecked = document.getElementById('nintendoSwitch');
            const pcChecked = document.getElementById('pc');
            const allPlatformsChecked = document.getElementById('allPlatforms');
            const onSaleChecked = document.getElementById('onSale');
            const notSaleChecked = document.getElementById('notSale');
            const lowHighChecked = document.getElementById('lowHigh');
            const highLowChecked = document.getElementById('highLow');
            let platformFilterVideogames;
            console.log(action.videogames);
                switch (action.videogames) {
                    case "ps4":
                        if (onSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps4 === true && videogame.edition.sale === true
                            ))
                        } else if (notSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps4 === true
                            ))
                        } else if (lowHighChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps4 === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (highLowChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps4 === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps4 === true
                            ))
                        }
                    break;
                    case "ps5":
                        if (onSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps5 === true && videogame.edition.sale === true
                            ))
                        } else if (notSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps5 === true
                            ))
                        } else if (lowHighChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps5 === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (highLowChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps5 === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps5 === true
                            ))
                        }
                    break;
                    case "xboxOne":
                        if (onSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxOne === true && videogame.edition.sale === true
                            ))
                        } else if (notSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxOne === true
                            ))
                        } else if (lowHighChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxOne === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (highLowChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxOne === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxOne === true
                            ))
                        }
                    break;
                    case "xboxSeriesSX":
                        if (onSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxSeriesSX === true && videogame.edition.sale === true
                            ))
                        } else if (notSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxSeriesSX === true
                            ))
                        } else if (lowHighChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxSeriesSX === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (highLowChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxSeriesSX === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxSeriesSX === true
                            ))
                        }
                    break;
                    case "nintendoSwitch":
                        if (onSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.nintendoSwitch === true && videogame.edition.sale === true
                            ))
                        } else if (notSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.nintendoSwitch === true
                            ))
                        } else if (lowHighChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.nintendoSwitch === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (highLowChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.nintendoSwitch === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.nintendoSwitch === true
                            ))
                        }
                    break;
                    case "pc":
                        if (onSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.pc === true && videogame.edition.sale === true
                            ))
                        } else if (notSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.pc === true
                            ))
                        } else if (lowHighChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.pc === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (highLowChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.pc === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.pc === true
                            ))
                        }
                    break;
                    case "allPlatforms":
                        if (onSaleChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true
                            ))
                        } else if (notSaleChecked.checked) {
                            filteredVideogames = state.videogamesList
                        } else if (lowHighChecked.checked) {
                            filteredVideogames = state.videogamesList.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (highLowChecked.checked) {
                            filteredVideogames = state.videogamesList.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else {
                            filteredVideogames = state.videogamesList
                        }
                    break;
                    case "onSale":
                        if (ps4Checked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true && videogame.ps4 === true
                            ))
                        } else if (ps5Checked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true && videogame.ps5 === true
                            ))
                        } else if (xboxOneChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true && videogame.xboxOne === true
                            ))
                        } else if (xboxSeriesSXChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true && videogame.xboxSeriesSX === true
                            ))
                        } else if (nintendoSwitchChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true && videogame.nintendoSwitch === true
                            ))
                        } else if (pcChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true && videogame.pc === true
                            ))
                        } else if (allPlatformsChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.edition.sale === true
                            ))
                        }
                    break;
                    case "notSale":
                        if (ps4Checked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps4 === true
                            ))
                        } else if (ps5Checked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps5 === true
                            ))
                        } else if (xboxOneChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxOne === true
                            ))
                        } else if (xboxSeriesSXChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxSeriesSX === true
                            ))
                        } else if (nintendoSwitchChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.nintendoSwitch === true
                            ))
                        } else if (pcChecked.checked) {
                            filteredVideogames = state.videogamesList.filter((videogame) => (
                                videogame.pc === true
                            ))
                        } else if (allPlatformsChecked.checked) {
                            filteredVideogames = state.videogamesList

                        } else {
                            filteredVideogames = state.videogamesList
                        }
                    break;
                    case 'lowHigh':
                        if (ps4Checked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps4 === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (ps5Checked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps5 === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (xboxOneChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxOne === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (xboxSeriesSXChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxSeriesSX === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (nintendoSwitchChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.nintendoSwitch === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (pcChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.pc === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else if (allPlatformsChecked.checked) {
                            filteredVideogames = state.videogamesList.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                a - b
                            ))
                        }
                    break;
                    case 'highLow':
                        if (ps4Checked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps4 === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else if (ps5Checked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.ps5 === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else if (xboxOneChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxOne === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else if (xboxSeriesSXChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.xboxSeriesSX === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else if (nintendoSwitchChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.nintendoSwitch === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else if (pcChecked.checked) {
                            platformFilterVideogames = state.videogamesList.filter((videogame) => (
                                videogame.pc === true
                            ))
                            filteredVideogames = platformFilterVideogames.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else if (allPlatformsChecked.checked) {
                            filteredVideogames = state.videogamesList.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        } else {
                            filteredVideogames = state.videogamesList.sort((a,b) => (
                                a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                                b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                                b - a
                            ))
                        }
                        // filteredVideogames = state.videogamesList.sort((a,b) => (
                        //     a = a.edition.sale ? a.edition.salePrice : a.edition.price,
                        //     b = b.edition.sale ? b.edition.salePrice : b.edition.price,
                        //     b - a
                        // ))
                    break;
                    default:
                        filteredVideogames = state.videogamesList
                    break;
                }
            console.log(filteredVideogames);
            newState = {
                ...state,
                loading: false,
                platformVideogames: filteredVideogames
            }
            break;
        case actionTypes.FILL_VIDEOGAME_BY_PLATFORM_LIST:
            newState = {
                ...state,
                loading: false,
                platformVideogames: state.videogamesList
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}