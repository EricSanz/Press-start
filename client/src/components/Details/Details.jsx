import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadOneVideogame } from '../../redux/actions/videogameActions';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import EditionButton from './Edition-Button/Edition-Button';
import PlatformButton from './Platform-Button/Platform-Button';
import './Details.scss';

function Details ({dispatch, videogame, match, loading}) {

    const [id] = useState(match.params.videogameId);

    useEffect(() => {
        if (!videogame || videogame._id !== id) {
            dispatch(loadOneVideogame(id))
        }
    }, [])

    return (
        <main>
            <div className="main__left">
                {loading ? <Loading/> : videogame && (
                    <>
                        <p>{videogame.game.first_title}</p>
                        <p>{videogame.id}</p>                        
                        {videogame.other_platforms.length > 0 ? (
                            <p>Other platforms:</p>
                        ) : null}
                        <div className="editions__container">
                            {videogame.other_platforms.length > 0 && videogame.other_platforms.map((platforms) => (
                                <PlatformButton platforms={platforms}/>
                            ))}
                        </div>
                        {videogame.other_editions.length > 0 ? (
                            <p>Other Editions:</p>
                        ) : null}
                        <div className="editions__container">
                            {videogame.other_editions.length > 0 && videogame.other_editions.map((editions) => (
                                <EditionButton editions={editions}/>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="main__right">

            </div>
        </main>
    )
};

function mapStateToProps({videogameReducer}) {
    return {
        videogame: videogameReducer.videogame,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

export default connect(mapStateToProps)(Details);