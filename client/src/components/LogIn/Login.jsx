import React, { useState } from 'react';
import './Login.scss';
import googleLogo from '../../svg/google.svg';
import facebookLogo from '../../svg/facebook.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { signInWithGoogle, loginUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Login({error, isLogged}) {

    const dispatch = useDispatch();

    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const user = userLocalStorage?.user;
    console.log(user);
    console.log(isLogged)
    const userId = user?.data.uid;

    const emailLogin = document.getElementById('email__login')?.value;
    const passwordLogin = document.getElementById('password__login')?.value;

    const [togglePassword, setTogglePassword] = useState(false);
    const [loginButton, setLoginButton] = useState(false);

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

    function checkPasswordCompleted({target}) {

        target.value.length < 8 ? target.className = 'password__input password__not__completed' : target.className = 'password__input password__completed';

        if (emailLogin?.includes('@') && emailLogin?.includes('.') && target?.value.length >= 8) {
            setLoginButton(true);
        } else {
            setLoginButton(false)
        }
    }

    function checkEmailCompleted({target}) {
        if (target.value.includes('@') && target.value.includes('.') && passwordLogin?.length >= 8) {
            setLoginButton(true);
        } else {
            setLoginButton(false);
        }
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
                    <input id="email__login" className="email__input" type="text" name="email" placeholder="Email" onChange={(event) => checkEmailCompleted(event)}/>
                    <p className="password__signin__error__message" id="password__login__length__error">Password - minimum 8 characters.</p>
                    <input id="password__login" className="password__input" name="password" type="password" placeholder="Password" onChange={(event) => checkPasswordCompleted(event)}/>
                    <FontAwesomeIcon id="see__login__password" className="password__icon not--slashed" icon="eye" onClick={() => seeHidePassword()}/>
                    <FontAwesomeIcon id="hide__login__password" className="password__icon slashed" icon="eye-slash" onClick={() => seeHidePassword()}/>
                    {error?.loginError ? (
                        <p id="errorId" className="error">{error.loginError.msg}</p>
                    ) : null}
                    {loginButton ? (
                        <Link to={'/login'} onClick={() => dispatch(loginUser(emailLogin, passwordLogin))}>
                            <button className="signIn__button">Sign In</button>
                        </Link>
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