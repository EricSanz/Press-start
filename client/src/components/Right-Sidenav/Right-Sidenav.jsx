import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Right-Sidenav.scss';

function RightSidenav() {

    const [togglePassword, setTogglePassword] = useState(false);

    function seeHidePassword() {
        const seePassword = document.getElementById('see__password');
        const hidePassword = document.getElementById('hide__password');
        const passwordInput = document.getElementById('password');

        setTogglePassword(!togglePassword);

        togglePassword ? seePassword.style.display = 'block' : seePassword.style.display = 'none';
        togglePassword ? hidePassword.style.display = 'none' : hidePassword.style.display = 'block';
        togglePassword ? passwordInput.type = 'text' : passwordInput.type = 'password';
    }

    return (
        <div className="right__sidenav">
            <div className="signIn__register">
                <button className="active signIn__register--option">Sign In</button>
                <button className="option signIn__register--option">Register</button>
            </div>
            <input className="email__input" type="text" placeholder="Email" />
            <input id="password" className="password__input" type="text" placeholder="Password" />
            <FontAwesomeIcon id="see__password" className="password__icon not--slashed" icon="eye"  onClick={() => seeHidePassword()}/>
            <FontAwesomeIcon id="hide__password" className="password__icon slashed" icon="eye-slash"  onClick={() => seeHidePassword()}/>
        </div>
    )
}

export default RightSidenav;