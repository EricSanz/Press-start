/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { loadVideogames } from '../../redux/actions/videogameActions';
import { bindActionCreators } from 'redux';
import './VideogamesList.scss';

function VideogameList({ videogamesList, dispatch, loading, error }) {
    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }
    }, [videogamesList?.length]);

    return (
        <div className="list__container">
            {error && <h3 className="noup">Noup</h3>}
            {loading ? <Loading /> : videogamesList && videogamesList.map((videogame) => (
                // <p>{videogame[0].ps4 ? <p>{videogame.game}</p> : null}</p>
                <>
                    {videogame.platforms[0].ps5 ? (
                        <>
                            <img src={videogame.platforms[0].platform.edition[0].cover}></img>
                        </>
                    ) : null}
                    {videogame.platforms[1]?.ps5 ? (
                        <>
                            <img src={videogame.platforms[1]?.platform.edition[0].cover}></img>
                        </>
                    ) : null}
                </>
                // <p>{videogame.platforms.ps4 ? <p>{videogame.game}</p> : null}</p>
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