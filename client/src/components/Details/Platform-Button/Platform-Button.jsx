import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadOneVideogame } from '../../../redux/actions/videogameActions';
import './Platform-Button.scss';

function PlatformButton({dispatch, platforms}) {
    return (
        <div className="platforms__buttons">
            <Link className="platforms__links" to={`${platforms._id}`} style={{ textDecoration: 'none' }} onClick={() => dispatch(loadOneVideogame(platforms._id))}>
                <div className="platforms">
                    <p className="platform">{platforms.edition.version}</p>
                </div>
            </Link>
        </div>
    )
}

function mapStateToProps({videogameReducer}) {
    return {
        videogame: videogameReducer.videogame,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

export default connect(mapStateToProps)(PlatformButton);