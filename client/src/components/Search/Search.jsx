import React, { useState } from 'react';
import '../Search/Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { filterVideogameByName, fillVideogameList } from '../../redux/actions/videogameActions';


function SearchComponent({ dispatch }) {

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

    function handleChange({ target }) {
        let { value } = target;
        if (value.length >= 3) {
            value = (`${value[0].toUpperCase()}${value.slice(1)}`)
            dispatch(filterVideogameByName(value));
        } else {
            dispatch(fillVideogameList());
        }
    }

    return (
        <div className="search__filter" id="search">
            <FontAwesomeIcon id="search__icon" className="search--icon" icon="search" onClick={() => handleSearchBar()} />
            <input className="search--input" id="search__input" type="text" placeholder="Search..." onChange={(event) => { handleChange(event); }} />
        </div>
    )
}

function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        filteredVideogameList: videogameReducer.filteredVideogameList,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

export default connect(mapStateToProps)(SearchComponent);
