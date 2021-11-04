import React, { useState } from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LeftSidenav from '../Left-Sidenav/Left-Sidenav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/actions/userActions';

function Header({isLogged}) {

    const [leftSidenav, setLeftSidenav] = useState(false);
    // const [rightSidenav, setRightSidenav] = useState(false);

    const dispatch = useDispatch();

    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const user = userLocalStorage?.user;
    console.log(user);
    const userId = user?.data.uid;

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

    // function handleRightSidenav() {
    //     setRightSidenav(!rightSidenav);

    //     const toggleRightSidenav = document.getElementById('rightSidenav__id');
    //     const openRightSidenav = document.getElementById('open__rightSidenav__icon');
    //     const closeRightSidenav = document.getElementById('close__rightSidenav__icon');
    //     const openRightMiniSidenav = document.getElementById('open__rightmini__icon');
    //     const closeRightMiniSidenav = document.getElementById('close__rightmini__icon');

    //     rightSidenav ? toggleRightSidenav.style.transform = 'translateX(340px)' : toggleRightSidenav.style.transform = 'translate(-340px)';
    //     rightSidenav ? openRightSidenav.style.display = 'block' : openRightSidenav.style.display = 'none';
    //     rightSidenav ? closeRightSidenav.style.display = 'none' : closeRightSidenav.style.display = 'block';
    // }

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
                    <Link to={''} className="link" key={'Home'}>
                        <img className="navbar__logo" src="https://i.ibb.co/DGPL6tk/press-start-logo-grey.png" alt="press-start-logo"></img>
                    </Link>
                    <div className="navbar__options-right">
                        {isLogged === true ? (
                            <>
                                <div className="navbar__option">
                                    <Link className="link" to={`/dashboard/${userId}`}>
                                        <FontAwesomeIcon className="icon" icon="user" />
                                    </Link>
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
                    {/* <FontAwesomeIcon id="open__rightmini__icon" className="icon open__right" icon="sign-in-alt" onClick={() => handleRightSidenav()}/> */}
                    {/* <FontAwesomeIcon id="close__rightmini__icon" className="icon close__right" icon="sign-in-alt" onClick={() => handleRightSidenav()}/> */}
                    <FontAwesomeIcon className="icon" icon="shopping-cart" />
                </div>
            </header>
            <div className="leftSidenav__container" id="leftSidenav__id">
                <LeftSidenav />
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