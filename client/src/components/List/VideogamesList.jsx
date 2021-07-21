/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import SearchComponent from '../Search/Search';
import FilterComponent from '../Filter/Filter';
import { loadVideogames } from '../../redux/actions/videogameActions';
import Card from './Card/Card';
import './VideogamesList.scss';

function VideogameList({ videogamesList, dispatch, loading, error, filteredVideogameList }) {

    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }
    }, [videogamesList?.length]);

    const displayVideogameList = (
        <>
            {!filteredVideogameList?.length && videogamesList?.length && videogamesList.map((videogame) => (
                <Card Games={videogame}/>
            ))}
            {filteredVideogameList?.length > 0 && filteredVideogameList.map((videogame) => (
                <Card Games={videogame}/>
            ))}
        </>
    )

    const notExist = (
        <>
            {filteredVideogameList?.length === 0 && <h3 className="notExist">A videogame with that name does not exist</h3>}
        </>
    )

    return (
        <div className={loading ? "list__loading" : "list__container"} id="list__container-id">
            {loading ? null : <SearchComponent />}
            {loading ? null : <FilterComponent />}
            {error && <h3 className="noup">There has been an error loading the videogames, sorry and try again later.</h3>}
            {filteredVideogameList?.length < 1 && notExist}
            {loading ? <Loading /> : videogamesList?.length > 0 && displayVideogameList }
        </div>
    )
}

function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        filteredVideogameList: videogameReducer.filteredVideogameList,
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