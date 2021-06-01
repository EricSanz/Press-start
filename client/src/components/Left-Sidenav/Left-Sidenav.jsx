import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../constants/categories';
import './Left-Sidenav.scss';

function LeftSidenav() {

    function closeleftSidenav() {
        const closeSidenav = document.getElementById('leftSidenav__id');
        closeSidenav.style.transform = 'translateX(0px)';
    }

    return (
        <section>
            <ul>
                {categories.map((category) => (
                    <Link to={category.route}>
                        <li className="left__sidenav-list" onClick={() => closeleftSidenav()}>
                            <p>{category.name}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </section>
    )
}

export default LeftSidenav;