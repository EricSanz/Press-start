import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../Search/SearchBar';

function Header() {

    let [searchBar, setSearchBar] = useState(false);

    // function handleClick() {
    //     setSearchBar = !searchBar;

    //     const openSearchBar = document.getElementById('search__component');

    //     searchBar ? openSearchBar.style.transform = 'translateY(85px)' : openSearchBar.style.transform = 'translateY(0px)';

    // }


    return (
        <>
            <header>
                <div className="navbar__options">
                    <div className="navbar__options-left">
                        <div className="navbar__option">
                            <FontAwesomeIcon className="icon" icon="bars" />
                            <p>Menu</p>
                        </div>
                        <div className="navbar__option">
                            <FontAwesomeIcon className="icon" icon="newspaper" />
                            <p>News</p>
                        </div>
                        <div className="navbar__option">
                            <FontAwesomeIcon className="icon" icon="search" onClick={() => setSearchBar(!searchBar)} />
                            <p>Search</p>
                        </div>
                    </div>
                    <img className="navbar__logo" src="https://i.ibb.co/DGPL6tk/press-start-logo-grey.png" alt="press-start-logo"></img>
                    <div className="navbar__options-right">
                        <div className="navbar__option">
                            <FontAwesomeIcon className="icon" icon="calendar-alt" />
                            <p>Calendar</p>
                        </div>
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
            {searchBar && (<SearchBar />)}
        </>
    )
}

export default Header;