/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import SearchBar from '../Search/SearchBar';
import { loadVideogames } from '../../redux/actions/videogameActions';
// import { bindActionCreators } from 'redux';
import Card from './Card/Card';
import './VideogamesList.scss';

function VideogameList({ videogamesList, dispatch, loading, error }) {

    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }
    }, [videogamesList?.length]);

    return (
        <div className={loading ? "list__loading" : "list__container"}>
            {loading ? null : <SearchBar />}
            {error && <h3 className="noup">There has been an error loading the videogames, sorry and try again later.</h3>}
            {loading ? <Loading /> : videogamesList && videogamesList.map((videogame) => (
                <Card Games={videogame}/>
            ))}
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

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({
//             requestVideogames,
//         }, dispatch),
//     };
// }

export default connect(mapStateToProps)(VideogameList);