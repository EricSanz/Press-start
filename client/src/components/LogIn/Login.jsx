import React, { useEffect, useState } from 'react';
import './Login.scss';
import googleLogo from '../../svg/google.svg';
import facebookLogo from '../../svg/facebook.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { signInWithGoogle, loginUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function Login({user, error, isLogged}) {

    const dispatch = useDispatch();
    let history = useHistory();

    console.log(user);
    console.log(error);
    console.log(isLogged)
    const userId = user?.uid;

    let emailLogin = document.getElementById('email__login')?.value;
    let passwordLogin = document.getElementById('password__login')?.value;

    const [togglePassword, setTogglePassword] = useState(false);
    const [loginButtonActive, setLoginButtonActive] = useState(false);
    const [checkedEmailState, setCheckedEmailState] = useState(false);
    const [checkedPasswordState, setCheckedPasswordState] = useState(false);
    const [login, setLogin] = useState(false);

    const loginError_ID = document.getElementById('loginError__ID');

    useEffect(() => {
        if (isLogged) {
            history.replace(`/dashboard/${userId}`);
        }

        if (error?.data && !user) {
            loginError_ID.className = 'error';
            setTimeout(() => (displayLoginError()), 3500 );
        }

        function displayLoginError() {
            loginError_ID.className = 'error__not__displayed';
        }

        if (checkedEmailState && checkedPasswordState) {
            setLoginButtonActive(true);
        }

        if (login) {
            dispatch(loginUser(emailLogin, passwordLogin));
            console.log(user);
            setLogin(false);
        }

    }, [isLogged, history, error, loginError_ID, checkedEmailState, checkedPasswordState, emailLogin, passwordLogin, login, dispatch, userId, user])

    function seeHidePassword() {
        console.log(user);

        const seePassword = document.getElementById('see__login__password');
        const hidePassword = document.getElementById('hide__login__password'); 
        const passwordInputLogin = document.getElementById('password__login');

        setTogglePassword(!togglePassword);

        togglePassword ? seePassword.style.display = 'none' : seePassword.style.display = 'block';
        togglePassword ? hidePassword.style.display = 'block' : hidePassword.style.display = 'none';
        togglePassword ? passwordInputLogin.type = 'password' : passwordInputLogin.type = 'text';
    }

    function checkEmail({target}) {
        if (target.value.includes('@') && target.value.includes('.')) {
            console.log(target.value);
            setCheckedEmailState(true);
        }
    }

    function checkPassword({target}) {

        target.value.length < 8 ? target.className = 'password__input password__not__completed' : target.className = 'password__input password__completed';

        if (target.value.length >= 8) {
            setCheckedPasswordState(true);
            console.log(target.value);
        } 
        // target?.value.length >= 8 ? setLoginButton(true) : setLoginButton(false);
    }

    return (
        <div className="login__container">
            <div className="login">
                <div className="signIn__register">
                    <button id="signIn__option__not__click" className="active signIn__register--option" >Sign In</button>
                    <Link to={'/register'}>
                        <button id="register__option__not__click" className="option signIn__register--option">Register</button>
                    </Link>
                </div>
                <div id="signIn__menu--id" className="signIn__menu">
                    <p className="e__signin__notfilled" id="email__login__notfilled">Email adress is not filled in.</p>
                    <input id="email__login" className="email__input" type="text" placeholder="Email" onChange={(event) => checkEmail(event)}/>
                    <p className="password__signin__error__message" id="password__login__length__error">Password - minimum 8 characters.</p>
                    <input id="password__login" className="password__input" name="password" type="password" placeholder="Password" onChange={(event) => checkPassword(event)}/>
                    <FontAwesomeIcon id="see__login__password" className="password__icon not--slashed" icon="eye" onClick={() => seeHidePassword()}/>
                    <FontAwesomeIcon id="hide__login__password" className="password__icon slashed" icon="eye-slash" onClick={() => seeHidePassword()}/>
                    <p id="loginError__ID" className="error__not__displayed">{error?.data?.loginError.msg}</p>
                    {loginButtonActive ? (
                        <button className="signIn__button" onClick={() => setLogin(true)}>Sign In</button>
                    ) : (
                        <button className="signIn__button__not__active">Sign In</button>
                    )}
                    <p className="p__signin">Or sign in easily with:</p>
                    <div className="logos__container">
                        <img src={googleLogo} alt="google" onClick={() => dispatch(signInWithGoogle())}/>
                        <img src={facebookLogo} alt="facebook" />
                    </div>
                </div>
            </div>
        </div>
    )
};

function mapStateToProps({ userReducer }) {
    return {
        user: userReducer.user,
        error: userReducer.error,
        isLogged: userReducer.isLogged,
    };
}

export default connect(mapStateToProps)(Login);