import React, { useState } from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LeftSidenav from '../Left-Sidenav/Left-Sidenav';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/actions/userActions';

function Header({user, isLogged}) {

    const [leftSidenav, setLeftSidenav] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
      
    function reloadHome() {

        if (user) {
            history.push("/");
        } else {
            history.push("/");
        }
    }
      
    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));

    const userLocalStorageGoogle = userLocalStorage?.user;

    userLocalStorageGoogle ? (isLogged = true) : (isLogged = false);
    const userId = user?.uid;

    function handleLeftSidenav() {
        setLeftSidenav(!leftSidenav);

        const toggleLeftSidenav = document.getElementById('leftSidenav__id');
        const openLeftSidenav = document.getElementById('open__icon');
        const closeLeftSidenav = document.getElementById('close__icon');
        const openLeftMiniSidenav = document.getElementById('open__mininavbar__icon');
        const closeLeftMiniSidenav = document.getElementById('close__mininavbar__icon');
        leftSidenav ? toggleLeftSidenav.style.transform = 'translateX(0px)' : toggleLeftSidenav.style.transform = 'translateX(340px)';
        leftSidenav ? openLeftSidenav.style.display = 'block' : openLeftSidenav.style.display = 'none';
        leftSidenav ? closeLeftSidenav.style.display = 'none' : closeLeftSidenav.style.display = 'block';
        leftSidenav ? openLeftMiniSidenav.style.display = 'block' : openLeftMiniSidenav.style.display = 'none';
        leftSidenav ? closeLeftMiniSidenav.style.display = 'none' : closeLeftMiniSidenav.style.display = 'block';
    }

    return (
        <>
            <header>
                <div className="navbar__options">
                    <div className="navbar__options-left">
                        <div className="navbar__option">
                            <FontAwesomeIcon id="open__icon" className="icon open" icon="bars" onClick={() => handleLeftSidenav()} />
                            <FontAwesomeIcon id="close__icon" className="icon close" icon="times" onClick={() => handleLeftSidenav()} />
                            <p>Menu</p>
                        </div>
                        <div className="navbar__option">
                            <FontAwesomeIcon className="icon" icon="newspaper" />
                            <p>News</p>
                        </div>
                        <div className="navbar__option">
                            <FontAwesomeIcon className="icon" icon="calendar-alt" />
                            <p>Calendar</p>
                        </div>
                    </div>
                    <img className="navbar__logo" onClick={() => reloadHome()} src="https://i.ibb.co/DGPL6tk/press-start-logo-grey.png" alt="press-start-logo"></img>
                    <div className="navbar__options-right">
                        {isLogged ? (
                            <>
                                <div className="navbar__option">
                                    <a className='link' href={`/dashboard/${userId}`}>
                                        <FontAwesomeIcon className="icon" icon="user" />
                                    </a>
                                    <p>Profile</p>
                                </div>
                                <div className="navbar__option">
                                    <Link className="link" to={''} onClick={() => {dispatch(signOut())}}>
                                        <FontAwesomeIcon id="close__rightSidenav__icon" className="icon" icon="sign-in-alt" />
                                    </Link>
                                    <p>Sign Out</p>
                                </div>
                                <div className="navbar__option">
                                    <FontAwesomeIcon className="icon" icon="shopping-cart" />
                                    <p>Cart</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="navbar__option">
                                    <Link className="link" to={'/login'}>
                                        <FontAwesomeIcon id="open__rightSidenav__icon" className="icon open__right" icon="sign-in-alt" />
                                    </Link>
                                    <p>Sign In</p>
                                </div>
                                <div className="navbar__option">
                                    <FontAwesomeIcon className="icon" icon="shopping-cart" />
                                    <p>Cart</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="mini__navbar">
                    <FontAwesomeIcon id="open__mininavbar__icon" className="icon open" icon="bars" onClick={() => handleLeftSidenav()} />
                    <FontAwesomeIcon id="close__mininavbar__icon" className="icon close" icon="times" onClick={() => handleLeftSidenav()} />
                    <FontAwesomeIcon className="icon" icon="newspaper" />
                    <FontAwesomeIcon className="icon" icon="calendar-alt" />
                    <FontAwesomeIcon className="icon" icon="shopping-cart" />
                </div>
            </header>
            <div className="leftSidenav__container" id="leftSidenav__id" onClick={() => setLeftSidenav(!leftSidenav)}>
                <LeftSidenav/>
            </div>
        </>
    )
}

function mapStateToProps({ userReducer }) {
    return {
        user: userReducer.user,
        isLogged: userReducer.isLogged
    }
}

export default connect(mapStateToProps)(Header);