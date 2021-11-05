import './Firebase/firebaseIndex';
import axios from 'axios';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import actionTypes from './actionTypes';

const userUrl = 'http://localhost:5000/user';
const userLoginUrl = 'http://localhost:5000/user/login';
const userRegisterUrl = 'http://localhost:5000/user/register';

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

// const email = document.getElementById('email').value;
// const password = document.getElementById('password').value;
// const userName = document.getElementById('user_Name').value;
export function registerUser(email, password, displayName) {
    // const auth = getAuth();
    return async (dispatch) => {
        const userData = { email, password, displayName };
        // localStorage.setItem('user', JSON.stringify({
        //     email: userData.email,
        //     password: userData.password,
        //     displayName: userData.displayName,
        // }));
        console.log(userData);
        // dispatch(signInSuccess(userData));
        try {
            // const { data } = axios.post(userUrl, userData);
            const response = await axios.post(userRegisterUrl, userData);
            console.log(response);
            if (response.data.registerError) {
                console.log(response.data.registerError.msg)
                dispatch(registerError(response.data.registerError))
            } else {
                console.log(response.statusText);
                localStorage.user = JSON.stringify({ user: { ...response } });
                console.log(localStorage.user);
                const { user } = response;
                dispatch(registerSuccess(user));
                // dispatch(signInSuccess(response));
                // dispatch(registerError(error))
                // console.log(response.data.error.msg);
            }
            console.log(localStorage.user.user);
            // console.log(data);
        } catch (error) {
            console.log(error);
            // console.log(response.error.msg);
            dispatch(registerError(error))
        }
    }
}

export function loginUser(email, password) {
    return async (dispatch) => {
        const userData = {email, password};
        console.log(userData);
        try {
            const response = await axios.post(userLoginUrl, userData);
            console.log(response);
            const user = response.data;
            if (user.loginError) {
                dispatch(signInError(user));
            } else {
                localStorage.user = JSON.stringify({ user: {...response } });
                // const { user } = response.data;
                // const user = response.data;
                // console.log(response.data);
                console.log(user);
                dispatch(signInSuccess(user));
            }
        } catch (error) {
            dispatch(signInError(error))
        }
    }
}



// export function registerUser() {
//     const auth = getAuth();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const userName = document.getElementById('user_Name').value;
//     return async (dispatch) => {
//         try {
//             createUserWithEmailAndPassword(auth, email, password, userName)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 console.log(user)
//                 dispatch(registerSuccess(user));
//             } )
//         } catch (error) {
//             dispatch(registerError(error))
//         }
//     }
// }