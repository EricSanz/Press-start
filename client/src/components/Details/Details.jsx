import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadOneVideogame } from '../../redux/actions/videogameActions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                        <div className="title__container">
                            {videogame.game.dual_title ? (
                                <p className="title__videogame">{videogame.game.first_title} <span className="second__title__videogame">{videogame.game.second_title}</span></p>
                            ) : (
                                <p className="title__videogame">{videogame.game.first_title}</p>
                            )}
                            <p className="title--addon">{videogame.edition.version} ({videogame.edition.name} Edition)</p>
                        </div>
                        <div className="videogame__favorite">
                            <FontAwesomeIcon className="heart-icon" icon="heart"/>
                        </div>
                        {videogame.edition.sale ? (
                            <div className="onsale__tag">
                                <p>On Sale</p>
                            </div>
                        ) : null}
                        <div className="cover__container">
                            <img className="cover--img" src={videogame.edition.cover} alt={videogame.id} />
                        </div>
                        {videogame.other_platforms.length > 0 ? (
                            <div className="platforms__container">
                                <p className="platforms__title">Platforms:</p>
                                <div className="selected-platform__container">
                                    <p className="selected-platform">{videogame.edition.version}</p>
                                </div>
                                {videogame.other_platforms.length > 0 && videogame.other_platforms.map((platforms) => (
                                    <PlatformButton platforms={platforms}/>
                                    ))}
                            </div>
                        ) : (
                            <div className="platforms__container">
                            <p className="platforms__title">Platforms:</p>
                            <div className="selected-platform__container">
                                <p className="selected-platform">{videogame.edition.version}</p>
                            </div>
                        </div>
                        )}
                        {videogame.other_editions.length > 0 ? (
                            <div className="editions__container">
                                <p className="editions__title">Editions:</p>
                                <div className="selected-edition__container">
                                    <p className="selected-edition">{videogame.edition.name}</p>
                                </div>
                                {videogame.other_editions.length > 0 && videogame.other_editions.map((editions) => (
                                    <EditionButton editions={editions}/>
                                    ))}
                            </div>
                        ) : (
                            <div className="editions__container">
                                <p className="editions__title">Editions:</p>
                                <div className="selected-edition__container">
                                    <p className="selected-edition">{videogame.edition.name}</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="main__right">
                {loading ? <Loading /> : videogame && (
                    <>
                        <div className="info__container">
                            <div className="price__cart--option">
                                {videogame.edition.sale ? (
                                    <div className="onsale__price--container">
                                        <p className="normal__price__onsale">{videogame.edition.price}€</p>
                                        <p className="onsale__price">{videogame.edition.salePrice}€</p>
                                    </div>
                                ) : (
                                    <div className="normal__price--container">
                                        <p className="normal__price">{videogame.edition.price}€</p>
                                    </div>
                                )}
                                {videogame.edition.stock ? (
                                    <>
                                        {videogame.release.released ? (
                                            <button className="add__cart__container">
                                                <p>ADD TO CART</p>
                                            </button>
                                        ) : (
                                            <button className="preorder__container">
                                                <p>PRE-ORDER</p>
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className="sold__out__container">
                                        <p>SOLD OUT</p>
                                    </div>
                                )}
                            </div>
                            <div className="general__info__container">
                                <div className="developer__genres__rating--info">
                                    <div className="rating__container">
                                        <p className="rating__title">Rating:</p>
                                        <div className="rating__stars">
                                            <div className="stars__top" style={{width: "71%"}}><span>★</span>
                                            <span>★</span><span>★</span><span>★</span><span>★</span></div>
                                            <div className="stars__bottom"><span>★</span><span>★</span>
                                            <span>★</span><span>★</span><span>★</span></div>
                                        </div>
                                        <p className="rating__opinions">from X Number of players</p>
                                    </div>
                                    <div className="developer__genres__container">
                                        <div className="genres__container">
                                            <p className="genres__title">Genres:</p>
                                            {videogame.genres.map((genre) => (
                                                <p className="genres">{genre}</p>
                                            ))}
                                        </div>
                                        <div className="developer__container">
                                                <p className="developer__title">Developer:</p>
                                                <p>{videogame.developer}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pegi__container">
                                    <img className="pegi" src={videogame.pegi} alt="pegi" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
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