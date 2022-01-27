import actionTypes from "../actions/actionTypes";

export default function userReducer(state = {}, action) {
    
    let newState = state;
    
    switch (action.type) {
        case actionTypes.AUTH_LOGIN:
            newState = {
                ...state,
                user: action.user,
                error: null,
                isLogged: true
            };
            break;
        case actionTypes.AUTH_LOGIN_ERROR:
            newState = {
                ...state,
                user: null,
                error: action.error,
                isLogged: false
            };
            break;
        case actionTypes.AUTH_LOGOUT:
            newState = {
                ...state,
                user: null,
                isLogged: false
            };
            break;
        case actionTypes.AUTH_LOGOUT_ERROR:
            newState = {
                ...state,
                error: action.error
            }
            break;
        case actionTypes.ADD_USER:
            newState = {
                ...state,
                user: action.newUser,
                isLogged: true
            };
            break;
        case actionTypes.ADD_USER_ERROR:
            newState = {
                ...state,
                error: action.error
            }
            break;
        case actionTypes.REGISTER_USER:
            newState = {
                ...state,
                user: action.user,
                error: null,
                isLogged: true
            }
            break;
        case actionTypes.REGISTER_USER_ERROR:
            newState = {
                ...state,
                user: null,
                error: action.error
            }
            break;
        case actionTypes.GET_USER:

            let favoritesGamesID = action.user.favorites.slice();
            favoritesGamesID = favoritesGamesID.map((games) => (
                games.id
            ));

            newState = {
                ...state,
                user: action.user,
                favoritesGamesID: favoritesGamesID,
                isLogged: true
            }
            break;
        case actionTypes.GET_USER_ERROR:
            newState = {
                ...state,
                error: action.error,
                isLogged: false
            }
            break;
        case actionTypes.ADD_FAVORITE:
            newState = {
                ...state,
                added: action.added,
            }
            break;
        case actionTypes.CHANGE_PROFILE_PIC:
            newState = {
                ...state,
                user: action.user,
            }
            break;
        case actionTypes.UPDATE_USER_INFO:
            newState = {
                ...state,
                user: action.user
            }
            break;
        case actionTypes.CHANGE_PASSWORD:
            const error = { message: "Your password has been updated" }
            newState = {
                ...state,
                user: action.user,
                message: error,
            }
            break;
        default:
            newState = state;
        break;
    }
    return newState;
}
