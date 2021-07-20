import React, { useState } from 'react';
import '../Search/SearchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBar() {

    const [searchBar, setSearchBar] = useState(false);
    const [searchIcon, setSearchIcon] = useState(false);
    const [searchInput, setSearchInput] = useState(false);

    function handleSearchBar() {
        setSearchBar(!searchBar);
        setSearchIcon(!searchIcon);
        setSearchInput(!searchInput);

        const openSearchBar = document.getElementById('search');
        const searchIconPlace = document.getElementById('search__icon');
        const searchInputDisplay = document.getElementById('search__input');
        searchBar ? openSearchBar.style.transform = 'translateX(0px)' : openSearchBar.style.transform = 'translateX(330px)';
        searchIcon ? searchIconPlace.style.transform = 'translateX(0px)' : searchIconPlace.style.transform = 'translateX(-330px)';
        searchInput ? searchInputDisplay.style.display = 'none' : searchInputDisplay.style.display = 'block';
    }

    return (
        <div className="search__filter" id="search">
            <FontAwesomeIcon id="search__icon" className="search--icon" icon="search" onClick={() => handleSearchBar()} />
            <input className="search--input" id="search__input" type="text" placeholder="Search..." />
        </div>
    )
}