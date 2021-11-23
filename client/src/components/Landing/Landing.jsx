import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { loadVideogames, sortVideogamesByDate, sortCardVideogames } from '../../redux/actions/videogameActions';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainSlider from '../Main-Slider/Main-Slider';
import CardSlider from '../Card-Slider/Card-Slider';
import './Landing.scss';

function Landing({ videogamesList, sortedByDate, cardVideogames, user, isLogged }) {
   
    const dispatch = useDispatch();
    console.log(user);

    let scrollTranslation = 0;

    const cardsContainerID = document.getElementById('videogame__cards-id');

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

    }, [dispatch, videogamesList, sortedByDate, cardVideogames]);

    function moveToLeft() {

        if (scrollTranslation > -0.01) {
            scrollTranslation += 0;
        } else {
            scrollTranslation += 14.5;
            cardsContainerID.style.transform = `translateX(${scrollTranslation}%)`;
        }
    }
    
    function moveToRight() {
        
        if (scrollTranslation < -114) {
            scrollTranslation += 0;
        } else {
            scrollTranslation -= 14.3;
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
                        <CardSlider cards={videogameCards} loggedUser={user}/>
                    ))}
                </div>
                <div className="go__right" id="go__right-id" onClick={() => moveToRight()}>
                    <FontAwesomeIcon className="icon__right" icon="angle-double-right"/>
                </div>
                <Link className="see__all-link" to={"/all-games"}>
                    <p>See all <span><FontAwesomeIcon icon="arrow-right" /></span></p>
                </Link>
            </div>
        </div>
    )
}

function mapStateToProps({ videogameReducer, userReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        sortedByDate: videogameReducer.sortedByDate,
        cardVideogames: videogameReducer.cardVideogames,
        user: userReducer.user,
        isLogged: userReducer.isLogged,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}


export default connect(mapStateToProps)(Landing);