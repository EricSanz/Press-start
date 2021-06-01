import React, { useState } from 'react';
import '../Search/SearchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBar() {

    const [searchBar, setSearchBar] = useState(false);

    function handleSearchBar() {
        setSearchBar(!searchBar);

        const openSearchBar = document.getElementById('search__component');
        searchBar ? openSearchBar.style.display = 'none' : openSearchBar.style.display = 'inline-flex';

        // const colorSearchIcon = document.getElementById('search');

        // searchBar ? colorSearchIcon.style.color = '#E8A92C' : colorSearchIcon.style.color = '#E8A92C';
    }

    return (
        <>
            <div className="navbar__option" id="search">
                <FontAwesomeIcon className="icon" icon="search" onClick={() => handleSearchBar()} />
                <p>Search</p>
            </div>
            <div className="search__container" id="search__component">
                <FontAwesomeIcon className="search__icon" icon="search" />
                <input type="text" placeholder="Search..." />
            </div>
        </>
    )
}