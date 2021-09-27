import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadVideogames } from '../../redux/actions/videogameActions';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import MainSlider from '../Main-Slider/Main-Slider';
import CardSlider from '../Card-Slider/Card-Slider';
import './Landing.scss';

function Landing({ videogamesList }) {
   
    const dispatch = useDispatch();

    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }

    }, [dispatch, videogamesList?.length])


    return (
        <div className="body">
            <MainSlider />
            <CardSlider />
        </div>
    )
}

function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}


export default connect(mapStateToProps)(Landing);