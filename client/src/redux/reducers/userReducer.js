import actionTypes from "../actions/actionTypes";

export default function userReducer(state = {}, action) {
    
    let newState = state;
    
    switch (action.type) {
        case actionTypes.AUTH_LOGIN:
            newState = {
                ...state,
                user: action.user,
                isLogged: true
            };
            break;
        case actionTypes.AUTH_LOGIN_ERROR:
            newState = {
                ...state,
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
                user: action.newUser
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
        default:
            newState = state;
        break;
    }
    return newState;
}
