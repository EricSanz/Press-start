import './Firebase/firebaseIndex';
import axios from 'axios';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import actionTypes from './actionTypes';

const userUrl = 'http://localhost:5000/user';

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
            const { user } = result;
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }));
            dispatch(signInSuccess(user));
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
            const { data } = await axios.put(userUrl, userData);
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

