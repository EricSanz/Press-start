import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const categories = [
    {
        name: 'Home',
        route: '',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'All Videogames',
        route: '/all-games',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'New Releases',
        route: '/new-releases',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'Coming Soon',
        route: '/coming-soon',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'On Sale',
        route: '/sales',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'PlayStation',
        route: '/playstation',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'Xbox',
        route: '/xbox',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'Nintendo Switch',
        route: '/nintendo-switch',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'PC Gaming',
        route: '/pc',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
    {
        name: 'Merchandising',
        route: '/merchandising',
        icon: <FontAwesomeIcon className="icon" icon="angle-double-right" />
    },
]

export default categories;