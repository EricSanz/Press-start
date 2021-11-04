import React, { useState } from 'react';
import './Register.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Register(error) {

    const dispatch = useDispatch();

    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const user = userLocalStorage?.user;
    const userId = user?.uid;
    const email = document.getElementById('email__register')?.value;
    const password = document.getElementById('password__register')?.value;
    const displayName = document.getElementById('user__name')?.value;
    
    const [togglePassword, setTogglePassword] = useState(false);


    function seeHidePassword() {
        const seePasswordRegister = document.getElementById('see__register__password');
        const hidePasswordRegister = document.getElementById('hide__register__password'); 
        const passwordInput = document.getElementById('password__register');

        setTogglePassword(!togglePassword);

        togglePassword ? seePasswordRegister.style.display = 'none' : seePasswordRegister.style.display = 'block';
        togglePassword ? hidePasswordRegister.style.display = 'block' : hidePasswordRegister.style.display = 'none';
        togglePassword ? passwordInput.type = 'password' : passwordInput.type = 'text';
    }

    function checkRegisterInputs() {
        const emailNotFilled = document.getElementById('email__not-filled');
        const invalidEmail = document.getElementById('email__invalid');
        const userNotFilled = document.getElementById('user__not-filled');
        const passwordLength = document.getElementById('password__length__error');

        if (email === '') {
            emailNotFilled.style.display = 'block';
            setTimeout(() => (emailNotFilled.style.display = 'none'), 3500 );
        } else if ((email.includes('@') === false) || (email.includes('.') === false)) {
            invalidEmail.style.display = 'block';
            setTimeout(() => (invalidEmail.style.display = 'none'), 3500 );
        } else if (displayName === '') {
            userNotFilled.style.display = 'block';
            setTimeout(() => (userNotFilled.style.display = 'none'), 3500 );
        } else if (password.length < 8) {
            passwordLength.style.display = 'block';
            setTimeout(() => (passwordLength.style.display = 'none'), 3500 );
        } else {
            dispatch(registerUser(email, password, displayName));
        }
    }

    return (
        <div className="register__container">
            <div className="register">
                <div className="signIn__register">
                    <Link to={'/login'}>
                        <button id="signIn__option__not__click" className="option signIn__register--option" >Sign In</button>
                    </Link>
                    <button id="register__option__not__click" className="active signIn__register--option">Register</button>
                </div>
                <div id="register__menu--id" className="register__menu">
                    <p className="user__notfilled" id="user__not-filled">User name is not filled in.</p>
                    <input id="user__name" className="userName__input" type="text" placeholder="User Name" />
                    <p className="e__notfilled" id="email__not-filled">Email adress is not filled in.</p>
                    <p className="invalid__email" id="email__invalid">Invalid email adress.</p>
                    <input id="email__register" className="email__input" type="text" placeholder="Email" />
                    <p className="password__error__message" id="password__length__error">Password - minimum 8 characters.</p>
                    <input id="password__register" className="password__input" type="password" placeholder="Password" />
                    <FontAwesomeIcon id="see__register__password" className="password__icon not--slashed" icon="eye" onClick={() => seeHidePassword()}/>
                    <FontAwesomeIcon id="hide__register__password" className="password__icon slashed" icon="eye-slash" onClick={() => seeHidePassword()}/>
                    <Link to={''} onClick={() => checkRegisterInputs()}>
                        <button className="register__button" >Register</button>
                    </Link>
                    {/* <p id="errorId" className="error">User name already exist.</p> */}
                    {error.error ? (
                        <p id="errorId" className="error">{error.error.msg}</p>
                    ) : null}
                </div>
            </div>
        </div>
    )
};

function mapStateToProps({ userReducer }) {
    return {
        user: userReducer.user,
        error: userReducer.error,
    };
}

export default connect(mapStateToProps)(Register);