import './Firebase/firebaseIndex';
import axios from 'axios';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import actionTypes from './actionTypes';

const userUrl = 'http://localhost:5000/user/';
const userLoginUrl = 'http://localhost:5000/user/login';
const userRegisterUrl = 'http://localhost:5000/user/register';
const userFavoritesUrl = 'http://localhost:5000/user/favorites';

export function signInSuccess(user) {
    return {
        type: actionTypes.AUTH_LOGIN,
        user,
    };
};

export function signInError(error) {
    return {
        type: actionTypes.AUTH_LOGIN_ERROR,
        error,
    };
};

export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return async (dispatch) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const {user} = result;
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }));
            dispatch(signInSuccess(result));
            dispatch(addUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }));
        } catch (error) {
            dispatch(signInError(error));
        }
    };
};

export function addUserSucces(newUser) {
    return {
        type: actionTypes.ADD_USER,
        newUser,
    };
};

export function addUserError(error) {
    return {
        type: actionTypes.ADD_USER_ERROR,
        error,
    };
};

export function addUser(userData) {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(userRegisterUrl, userData);
            localStorage.user = JSON.stringify({ user: { ...data } });
            dispatch(addUserSucces(data));
        } catch (error) {
            dispatch(addUserError(error));
        };
    };
};

export function signOutSuccess() {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export function signOutError(error) {
    return {
        type: actionTypes.AUTH_LOGOUT_ERROR,
        error,
    };
};

export function signOut() {
    return async (dispatch) => {
        try {
            localStorage.removeItem('user');
            const auth = getAuth();
            await signOut(auth);
            dispatch(signOutSuccess());
        } catch (error) {
            dispatch(signOutError(error));
        };
    };
};

export function registerSuccess(user) {
    return {
        type: actionTypes.REGISTER_USER,
        user,
    };
};

export function registerError(error) {
    console.log(error);
    return {
        type: actionTypes.REGISTER_USER_ERROR,
        error,
    };
};

export function registerUser(email, password, displayName) {
    return async (dispatch) => {
        const userData = { email, password, displayName };
        try {
            const response = await axios.post(userRegisterUrl, userData);
            const user = response.data;
            if (user.registerError) {
                dispatch(registerError(user))
            } else {
                localStorage.user = JSON.stringify({ user: { ...response } });
                dispatch(registerSuccess(user));
            }
        } catch (error) {
            dispatch(registerError(error))
        }
    }
}

export function loginUser(email, password) {
    return async (dispatch) => {
        const userData = {email, password};
        try {
            const response = await axios.post(userLoginUrl, userData);
            const user = response.data;
            if (user.loginError) {
                dispatch(signInError(user));
            } else {
                localStorage.user = JSON.stringify({ user: {...response } });
                dispatch(signInSuccess(user));
            }
        } catch (error) {
            dispatch(signInError(error))
        }
    }
}

export function getUser(uid) {
    return async (dispatch) => {
        const backEndPoint = `${userUrl}${uid}`
        try {
            const user = await axios.get(backEndPoint);
            // localStorage.user = JSON.stringify({ user: {...user.data } });
            dispatch(getUserSucces(user.data))
        } catch (error) {
            dispatch(getUserError(error))
        }
    };
}

function getUserSucces(user) {
    return {
        type: actionTypes.GET_USER,
        user,
    }
}

function getUserError(error) {
    return {
        type: actionTypes.GET_USER_ERROR,
        error,
    }
}

export function addFavorite(userId, videogameId) {
    const neededData = {userId, videogameId}
    return async (dispatch) => {
        try {
            const response = await axios.post(userFavoritesUrl, neededData);
            dispatch(addFavoriteSuccess(response));
        } catch (error) {
            dispatch(addFavoriteError(error))
        }
    }
}

function addFavoriteSuccess(added) {
    return {
        type: actionTypes.ADD_FAVORITE,
        added,
    }
}

function addFavoriteError(error) {
    return {
        type: actionTypes.ADD_FAVORITE_ERROR,
        error,
    }
}

export function changeProfilePic(userId, photoUrl) {
    const data = {userId, photoUrl};
    const backEndPoint = `${userUrl}${userId}`
    return async (dispatch) => {
        try {
            const response = await axios.post(backEndPoint, data);
            dispatch(changeProfilePicSuccess(response))
            localStorage.user = JSON.stringify({ user: {...response } });
        } catch (error) {
            dispatch(changeProfilePicError(error))
        }
    }
}

function changeProfilePicSuccess(user) {
    return {
        type: actionTypes.CHANGE_PROFILE_PIC,
        user,
    }
}

function changeProfilePicError(error) {
    return {
        type: actionTypes.CHANGE_PROFILE_PIC_ERROR,
        error,
    }
}

export function updateUserInfo(userId, firstName, lastName, displayName, birthDate, gender, mobile, landline) {
    const data = { userId, firstName, lastName, displayName, birthDate, gender, mobile, landline };
    const backEndPoint = `${userUrl}${userId}`;
    return async (dispatch) => {
        try {
            const response = await axios.patch(backEndPoint, data);
            dispatch(updateUserInfoSuccess(response));
            localStorage.user = JSON.stringify({ user: {...response } });
        } catch (error) {
            dispatch(updateUserInfoError(error));
        }
    }
}

function updateUserInfoSuccess(user) {
    return {
        type: actionTypes.UPDATE_USER_INFO,
        user,
    }
}

function updateUserInfoError(error) {
    return {
        type: actionTypes.UPDATE_USER_INFO_ERROR,
        error,
    }
}

export function changePassword(userId, actualPassword, newPassword) {
    const data = { userId, actualPassword, newPassword };
    const backEndPoint = `${userUrl}${userId}`;
    return async (dispatch) => {
        try {
            const response = await axios.put(backEndPoint, data);
            dispatch(changePasswordSuccess(response));
            // localStorage.user = JSON.stringify({ user: {...response } });
        } catch (error) {
            dispatch(changePasswordError(error));
        }
    }
}

function changePasswordSuccess(user) {
    return {
        type: actionTypes.CHANGE_PASSWORD,
        user,
    }
}

function changePasswordError(error) {
    return {
        type: actionTypes.CHANGE_PASSWORD_ERROR,
        error,
    }
}