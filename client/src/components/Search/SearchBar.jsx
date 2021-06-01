import React from 'react';
import '../Search/SearchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBar() {
    return (
        <div className="search__container" id="search__component">
            <FontAwesomeIcon className="icon" icon="search" />
            <input type="text" placeholder="Search..." />
        </div>
    )
}