import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadVideogames, sortVideogamesByDate, sortCardVideogames } from '../../redux/actions/videogameActions';
import { getUser } from '../../redux/actions/userActions';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainSlider from '../Main-Slider/Main-Slider';
import CardSlider from '../Card-Slider/Card-Slider';
import './Landing.scss';

function Landing({ videogamesList, sortedByDate, cardVideogames, user, isLogged, cardIds, favoritesGamesID }) {
   
    const dispatch = useDispatch();
    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user?.data;

    let scrollTranslation = 0;
    let i = -1;

    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }

        if (videogamesList?.length && !sortedByDate) {
            dispatch(sortVideogamesByDate(videogamesList));
        }

        if (videogamesList?.length && !cardVideogames) {
            dispatch(sortCardVideogames(videogamesList));
        }

        if (!user && localStorageUser) {
            dispatch(getUser(localStorageUser.uid))
        }

    }, [dispatch, videogamesList, sortedByDate, cardVideogames, user, localStorageUser]);

    function moveToLeft() {
        const cardsContainerID = document.getElementById('videogame__cards-id');
        const leftB = document.getElementById('go__left-id');
        const rigthB = document.getElementById('go__right-id');

        rigthB.style.display = 'flex';

        if (scrollTranslation > -15) {
            scrollTranslation += 14.5;
            cardsContainerID.style.transform = `translateX(${scrollTranslation}%)`;
            leftB.style.display = 'none';
        } else {
            scrollTranslation += 14.5;
            cardsContainerID.style.transform = `translateX(${scrollTranslation}%)`;
        }
    }
    
    function moveToRight() {
        const cardsContainerID = document.getElementById('videogame__cards-id');
        const leftB = document.getElementById('go__left-id');
        const rigthB = document.getElementById('go__right-id');

        leftB.style.display = 'flex';
 
        if (scrollTranslation < -99) {
            scrollTranslation -= 14.5;
            rigthB.style.display = 'none';
            cardsContainerID.style.transform = `translateX(${scrollTranslation}%)`;
        } else {
            scrollTranslation -= 14.5;
            cardsContainerID.style.transform = `translateX(${scrollTranslation}%)`;
        }
    }

    return (
        <div className="body">
            {sortedByDate?.length > 1 && (
                <MainSlider videogames={sortedByDate}/>
            )}
            <div className="card__slider--container">
                <p className="title__cards">All Videogames</p>
                <div className="go__left" id="go__left-id" onClick={() => moveToLeft()}>
                    <FontAwesomeIcon className="icon__left" icon="angle-double-left"/>
                </div>
                <div className="videogame__card__slider" id="videogame__cards-id">
                    {cardVideogames?.length > 0 && cardVideogames.map((videogameCards) => (
                        <CardSlider cards={videogameCards} loggedUser={user} cardids={cardIds} cardIndex={i+=1} favGamesID={favoritesGamesID}/>
                    ))}
                    <Link id="link-all-id" className="see__all-link" to={"/all-games"}>
                        <div className="link-container">
                            <p>See all</p>
                            <FontAwesomeIcon icon="arrow-right" className="arrow-icon"/>
                        </div>
                    </Link>
                </div>
                <div className="go__right" id="go__right-id" onClick={() => moveToRight()}>
                    <FontAwesomeIcon className="icon__right" icon="angle-double-right"/>
                </div>
                {/* <Link id="link-all-id" className="see__all-link" to={"/all-games"}>
                    <p>See all <span><FontAwesomeIcon icon="arrow-right" /></span></p>
                </Link> */}
            </div>
        </div>
    )
}

function mapStateToProps({ videogameReducer, userReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        sortedByDate: videogameReducer.sortedByDate,
        cardVideogames: videogameReducer.cardVideogames,
        cardIds: videogameReducer.cardIds,
        user: userReducer.user,
        favoritesGamesID: userReducer.favoritesGamesID,
        isLogged: userReducer.isLogged,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}


export default connect(mapStateToProps)(Landing);