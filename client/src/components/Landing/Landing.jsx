import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadVideogames, sortVideogamesByDate, sortCardVideogames } from '../../redux/actions/videogameActions';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import MainSlider from '../Main-Slider/Main-Slider';
import CardSlider from '../Card-Slider/Card-Slider';
import './Landing.scss';

function Landing({ videogamesList, sortedByDate, cardVideogames }) {
   
    const dispatch = useDispatch();

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

    }, [dispatch, videogamesList, sortedByDate, cardVideogames])


    return (
        <div className="body">
            {sortedByDate?.length > 1 && (
                <MainSlider videogames={sortedByDate}/>
            )}
            <div className="videogame__card__slider">
                {cardVideogames?.length > 0 && cardVideogames.map((videogameCards) => (
                    <CardSlider cards={videogameCards}/>
                ))}
            </div>
        </div>
    )
}

function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        sortedByDate: videogameReducer.sortedByDate,
        cardVideogames: videogameReducer.cardVideogames,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}


export default connect(mapStateToProps)(Landing);