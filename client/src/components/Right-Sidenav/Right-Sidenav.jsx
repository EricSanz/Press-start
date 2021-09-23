import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Right-Sidenav.scss';
import googleLogo from '../../svg/google.svg';
import facebookLogo from '../../svg/facebook.svg';

function RightSidenav() {

    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleActiveOption, setToggleActiveOption] = useState(false);

    function seeHidePassword() {
        const seePassword = document.getElementById('see__password');
        const hidePassword = document.getElementById('hide__password');
        const passwordInput = document.getElementById('password');

        setTogglePassword(!togglePassword);

        togglePassword ? seePassword.style.display = 'block' : seePassword.style.display = 'none';
        togglePassword ? hidePassword.style.display = 'none' : hidePassword.style.display = 'block';
        togglePassword ? passwordInput.type = 'text' : passwordInput.type = 'password';
    }

    function activeOption() {
        const signInOption = document.getElementById('signIn__option');
        const registerOption = document.getElementById('register__option');

        setToggleActiveOption(!toggleActiveOption);

        toggleActiveOption ? signInOption.className = 'active signIn__register--option' : signInOption.className = 'option signIn__register--option';
        toggleActiveOption ? registerOption.className = 'option signIn__register--option' : registerOption.className = 'active signIn__register--option';
    }

    return (
        <div className="right__sidenav">
            <div className="signIn__register">
                <button id="signIn__option" className="active signIn__register--option" onClick={() => activeOption()}>Sign In</button>
                <button id="register__option" className="option signIn__register--option" onClick={() => activeOption()}>Register</button>
            </div>
            <div className="signIn__menu">
                <input className="email__input" type="text" placeholder="Email" />
                <input id="password" className="password__input" type="text" placeholder="Password" />
                <FontAwesomeIcon id="see__password" className="password__icon not--slashed" icon="eye" onClick={() => seeHidePassword()}/>
                <FontAwesomeIcon id="hide__password" className="password__icon slashed" icon="eye-slash" onClick={() => seeHidePassword()}/>
                <button className="signIn__button">Sign In</button>
                <p className="p__signin">Or sign in easily with:</p>
                <div className="logos__container">
                    <img src={googleLogo} alt="google" />
                    <img src={facebookLogo} alt="facebook" />
                </div>
            </div>
        </div>
    )
}

export default RightSidenav;