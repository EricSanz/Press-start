import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadVideogames, sortVideogamesByDate } from '../../redux/actions/videogameActions';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import MainSlider from '../Main-Slider/Main-Slider';
import CardSlider from '../Card-Slider/Card-Slider';
import './Landing.scss';

function Landing({ videogamesList, sortedByDate }) {
   
    const dispatch = useDispatch();

    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }

        if (videogamesList?.length && !sortedByDate) {
            dispatch(sortVideogamesByDate(videogamesList));
        }

    }, [dispatch, videogamesList, sortedByDate])


    return (
        <div className="body">
            {sortedByDate?.length > 1 && (
                <MainSlider videogames={sortedByDate}/>
            )}
            <CardSlider />
        </div>
    )
}

function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        sortedByDate: videogameReducer.sortedByDate,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}


export default connect(mapStateToProps)(Landing);