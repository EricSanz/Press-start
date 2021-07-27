import React, { useState } from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LeftSidenav from '../Left-Sidenav/Left-Sidenav';

function Header() {

    const [leftSidenav, setLeftSidenav] = useState(false);

    function handleSidenav() {
        setLeftSidenav(!leftSidenav);

        const toggleLeftSidenav = document.getElementById('leftSidenav__id');
        const openLeftSidenav = document.getElementById('open__icon');
        const closeLeftSidenav = document.getElementById('close__icon');
        leftSidenav ? toggleLeftSidenav.style.transform = 'translateX(0px)' : toggleLeftSidenav.style.transform = 'translateX(340px)';
        leftSidenav ? openLeftSidenav.style.display = 'block' : openLeftSidenav.style.display = 'none';
        leftSidenav ? closeLeftSidenav.style.display = 'none' : closeLeftSidenav.style.display = 'block';
    }

    return (
        <>
            <header>
                <div className="navbar__options">
                    <div className="navbar__options-left">
                        <div className="navbar__option">
                            <FontAwesomeIcon id="open__icon" className="icon open" icon="bars" onClick={() => handleSidenav()} />
                            <FontAwesomeIcon id="close__icon" className="icon close" icon="times" onClick={() => handleSidenav()} />
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
                    <img className="navbar__logo" src="https://i.ibb.co/DGPL6tk/press-start-logo-grey.png" alt="press-start-logo"></img>
                    <div className="navbar__options-right">
                        <div className="navbar__option">
                            <FontAwesomeIcon className="icon" icon="sign-in-alt" />
                            <p>Sign In</p>
                        </div>
                        <div className="navbar__option">
                            <FontAwesomeIcon className="icon" icon="shopping-cart" />
                            <p>Cart</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="leftSidenav__container" id="leftSidenav__id">
                <LeftSidenav />
            </div>
        </>
    )
}

export default Header;