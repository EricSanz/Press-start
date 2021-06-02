import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../constants/categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Left-Sidenav.scss';

function LeftSidenav() {

    function closeleftSidenav() {
        const closeSidenav = document.getElementById('leftSidenav__id');
        closeSidenav.style.transform = 'translateX(0px)';
    }

    // style={{ textDecoration: 'none' }}

    return (
        <section className="left__sidenav">
            <ul>
                {categories.map((category) => (
                    <Link to={category.route} className="link" key={category.name}>
                        <li className="left__sidenav-list" onClick={() => closeleftSidenav()}>
                            <p className="left__sidenav-option">{category.name}</p>
                            <span className="left__sidenav-icon">{category.icon}</span>
                        </li>
                    </Link>
                ))}
                <div className="left__sidenav-newsletter">
                    <div className="title-newsletter">
                        <FontAwesomeIcon className="icon-newsletter" icon="envelope-open-text" />
                        <p className="subscribe-newsletter">Subscribe to our newsletter:</p>
                    </div>
                    <div className="input-newsletter">
                        <input placeholder="Introduce your email" /><button type="button">Send</button>
                    </div>
                </div>
            </ul>
        </section>
    )
}

export default LeftSidenav;