import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadOneVideogame } from '../../../redux/actions/videogameActions';
import "./Edition-Button.scss";

function EditionButton({dispatch, editions}) {
    return (
        <div className="editions__buttons">
            <Link className="editions__links" to={`${editions._id}`} onClick={() => dispatch(loadOneVideogame(editions._id))}>
                <div className="editions">
                    <p className="edition">{editions.edition.name}</p>
                </div>
            </Link>
        </div>
    )
};

function mapStateToProps({videogameReducer}) {
    return {
        videogame: videogameReducer.videogame,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

export default connect(mapStateToProps)(EditionButton);
