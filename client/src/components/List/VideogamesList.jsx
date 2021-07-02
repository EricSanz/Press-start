/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { loadVideogames } from '../../redux/actions/videogameActions';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './VideogamesList.scss';

function VideogameList({ videogamesList, dispatch, loading, error }) {
    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }
    }, [videogamesList?.length]);

    return (
        <div className={loading ? "list__loading" : "list__container"}>
            {error && <h3 className="noup">Noup</h3>}
            {loading ? <Loading /> : videogamesList && videogamesList.map((videogame) => (
                <div className="videogame__list">
                    {videogame.platforms[0].ps5 ? (
                        <div className="videogame__card">
                            <p className="videogame__card-title">{videogame.game}</p>
                            <div className="videogame__favorite--container">
                                <FontAwesomeIcon icon="heart" />
                            </div>
                            <div className="videogame__buy--container">
                                <FontAwesomeIcon icon="shopping-cart" />
                            </div>
                            <img className="videogame__card-image" alt={videogame.game} src={videogame.platforms[0].platform.edition[0].cover}></img>
                            <div className="videogame__card-price--container">
                                {videogame.platforms[0].platform.edition[0].sale ? (
                                    <>
                                        <div className="videogame__onsale-text">
                                            <p className="onsale__text">On Sale</p>
                                        </div>
                                        <div className="videogame__card-price">
                                            <p className="price__nosale">{videogame.platforms[0].platform.edition[0].price}€</p>
                                            <p className="price__onsale">{videogame.platforms[0].platform.edition[0].salePrice}€</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="videogame__card-price">
                                        <p className="price__onsale">{videogame.platforms[0].platform.edition[0].price}€</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                    {videogame.platforms[1]?.ps5 ? (
                        <div className="videogame__card">
                            <p className="videogame__card-title">{videogame.game}</p>
                            <div className="videogame__favorite--container">
                                <FontAwesomeIcon icon="heart" />
                            </div>
                            <div className="videogame__buy--container">
                                <FontAwesomeIcon icon="shopping-cart" />
                            </div>
                            <img className="videogame__card-image" alt={videogame.game} src={videogame.platforms[1]?.platform.edition[0].cover}></img>
                            <div className="videogame__card-price--container">
                                {videogame.platforms[1].platform.edition[0].sale ? (
                                    <>
                                        <div className="videogame__onsale-text">
                                            <p className="onsale__text">On Sale</p>
                                        </div>
                                        <div className="videogame__card-price">
                                            <p className="price__nosale">{videogame.platforms[1].platform.edition[0].price}€</p>
                                            <p className="price__onsale">{videogame.platforms[1].platform.edition[0].salePrice}€</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="videogame__card-price">
                                        <p className="price__onsale" >{videogame.platforms[1].platform.edition[0].price}€</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>
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