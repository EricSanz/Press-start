import React, { useState, useEffect } from 'react';
import './Register.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function Register({user, error, isLogged}) {

    const dispatch = useDispatch();
    let history = useHistory();

    const userId = user?.uid;
    let emailValue = document.getElementById('email__register')?.value;
    let passwordValue = document.getElementById('password__register')?.value;
    let displayNameValue = document.getElementById('user__name')?.value;
    const registerError_ID = document.getElementById('registerError__ID');
    
    const [togglePassword, setTogglePassword] = useState(false);
    const [emailState, setEmailState] = useState(false);
    const [passwordState, setPasswordState] = useState(false);
    const [displayNameState, setDisplayNameState] = useState(false);
    const [checkButton, setCheckButton] = useState(false);

    function checkRegisterInputs() {
        const invalidEmail = document.getElementById('email__invalid');
        const userNotFilled = document.getElementById('user__not-filled');
        const passwordLength = document.getElementById('password__length__error');

        if (!emailState) {
            invalidEmail.style.display = 'block';
            setTimeout(() => (invalidEmail.style.display = 'none'), 3500 );
        } else if (!passwordState) {
            passwordLength.style.display = 'block';
            setTimeout(() => (passwordLength.style.display = 'none'), 3500 );
        } else if (!displayNameState) {
            userNotFilled.style.display = 'block';
            setTimeout(() => (userNotFilled.style.display = 'none'), 3500 );
        } else {
            setCheckButton(true);
        }
    }

    console.log(error);

    useEffect(() => {
        if (isLogged) {
            history.replace(`/dashboard/${userId}`);
        }

        if (error) {
            registerError_ID.className = 'error';
            setTimeout(() => (displayRegisterError()), 3500 );
        }

        function displayRegisterError() {
            registerError_ID.className = 'error__not__displayed';
        }

        if (checkButton) {
            dispatch(registerUser(emailValue, passwordValue, displayNameValue));
            setCheckButton(false);
        }

    }, [isLogged, history, error, registerError_ID, dispatch, emailValue, passwordValue, displayNameValue, checkButton, userId])

    function emailInputChange({target}) {
        if (target.value.includes('@') && target.value.includes('.')) {
            console.log(target.value);
            setEmailState(true);
        }
    }

    function displayNameInputChange({target}) {
        if (target.value !== '') {
            setDisplayNameState(true);
            console.log(target.value);
        }
    }

    function passwordInputChange({target}) {
        if (target.value.length >= 8) {
            setPasswordState(true);
            console.log(target.value);
        } 
    }

    function seeHidePassword() {
        const seePasswordRegister = document.getElementById('see__register__password');
        const hidePasswordRegister = document.getElementById('hide__register__password'); 
        const passwordInput = document.getElementById('password__register');

        setTogglePassword(!togglePassword);

        togglePassword ? seePasswordRegister.style.display = 'none' : seePasswordRegister.style.display = 'block';
        togglePassword ? hidePasswordRegister.style.display = 'block' : hidePasswordRegister.style.display = 'none';
        togglePassword ? passwordInput.type = 'password' : passwordInput.type = 'text';
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
                    <input id="user__name" className="userName__input" type="text" placeholder="User Name" onChange={(event) => displayNameInputChange(event)}/>
                    <p className="invalid__email" id="email__invalid">Invalid email adress.</p>
                    <input id="email__register" className="email__input" type="text" placeholder="Email" onChange={(event) => emailInputChange(event)}/>
                    <p className="password__error__message" id="password__length__error">Password - minimum 8 characters.</p>
                    <input id="password__register" className="password__input" type="password" placeholder="Password" onChange={(event) => passwordInputChange(event)}/>
                    <FontAwesomeIcon id="see__register__password" className="password__icon not--slashed" icon="eye" onClick={() => seeHidePassword()}/>
                    <FontAwesomeIcon id="hide__register__password" className="password__icon slashed" icon="eye-slash" onClick={() => seeHidePassword()}/>
                    <button className="register__button" onClick={() => checkRegisterInputs()}>Register</button>
                    <p id="registerError__ID" className="error__not__displayed">{error?.registerError?.msg}</p>
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

export default connect(mapStateToProps)(Register);