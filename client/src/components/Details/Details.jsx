import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadOneVideogame } from '../../redux/actions/videogameActions';
import './Details.scss';

function Details ({dispatch, videogame, match}) {

    const [id] = useState(match.params.videogameId);

    useEffect(() => {
        if (!videogame || videogame.id !== id) {
            dispatch(loadOneVideogame(id))
        }
    }, [])

    return (
        <main>
            {videogame && (
                <p>{videogame.game.first_title}</p>
            )}
        </main>
    )
};

function mapStateToProps({videogameReducer}) {
    return {
        videogame: videogameReducer.videogame,
    }
}

export default connect(mapStateToProps)(Details);