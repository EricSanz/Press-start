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

    function selectedTabOption({target}) {
        const contentOption = document.getElementById('label__content');
        const contentInfo = document.getElementById('content__info');
        const picturesInfo = document.getElementById('pictures__info');
        const descriptionInfo = document.getElementById('description__info');

        if (target.value === 'pictures' ) {
            contentOption.style.backgroundColor = '#161616';
            contentOption.style.color = '#fff';
            contentOption.style.fontWeight = 'normal';
            picturesInfo.style.display = 'block';
            contentInfo.style.display = 'none';
            descriptionInfo.style.display = 'none';
        }

        if (target.value === 'description') {
            contentOption.style.backgroundColor = '#161616';
            contentOption.style.color = '#fff';
            contentOption.style.fontWeight = 'normal';
            descriptionInfo.style.display = 'block';
            contentInfo.style.display = 'none';
            picturesInfo.style.display = 'none';
        }

        if (target.value === 'content') {
            contentOption.style.backgroundColor = '#e8a92c';
            contentOption.style.color = '#161616';
            contentOption.style.fontWeight = '600';
            contentInfo.style.display = 'block';
            picturesInfo.style.display = 'none';
            descriptionInfo.style.display = 'none';
        }
    }

    function selectedTabOption2({target}) {
        const picturesOption = document.getElementById('label__pictures');
        const picturesInfo = document.getElementById('pictures__info');
        const descriptionInfo = document.getElementById('description__info');

        if (target.value === 'description') {
            picturesOption.style.backgroundColor = '#161616';
            picturesOption.style.color = '#fff';
            picturesOption.style.fontWeight = 'normal'
            descriptionInfo.style.display = 'block';
            picturesInfo.style.display = 'none';
        }
        
        if (target.value === 'pictures') {
            picturesOption.style.backgroundColor = '#e8a92c';
            picturesOption.style.color = '#161616';
            picturesOption.style.fontWeight = '600';
            picturesInfo.style.display = 'block';
            descriptionInfo.style.display = 'none';
        }
    }

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
                        <div className="videogame__info--wrapper">
                            <div className="info--wrapper">
                                {videogame.edition.is_content ? (
                                    <>
                                        <div>
                                            <input type="radio" id="content" value="content" name="options" onChange={(value) => selectedTabOption(value)}/>
                                            <label className="label--content label--left" id="label__content" for="content">Content</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="pictures" value="pictures" name="options" onChange={(value) => selectedTabOption(value)}/>
                                            <label className="label--pictures" for="pictures">Pictures</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="description" value="description" name="options" onChange={(value) => selectedTabOption(value)}/>
                                            <label className="label--description" for="description">Description</label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <input type="radio" id="pictures" value="pictures" name="options" onChange={(value) => selectedTabOption2(value)}/>
                                            <label className="label--pictures label--left" id="label__pictures" for="pictures">Pictures</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="description" value="description" name="options" onChange={(value) => selectedTabOption2(value)}/>
                                            <label className="label--description" for="description">Description</label>
                                        </div>
                                    </>
                                )}
                            </div>
                            {videogame.edition.is_content ? (
                                <>
                                    <div className="content__info" id="content__info">
                                        {videogame.edition.content_image[0] === '' ? null : (
                                            <div className="content__image--container">
                                                {videogame.edition.content_image.map((contentImage) => (
                                                    <img className="content__image" src={contentImage} alt={videogame.game.first_title} />
                                                ))}
                                            </div>
                                        )}
                                        <div className="content__info__pack">
                                            {videogame.edition.content.map((info) => (
                                                <>
                                                    <p>{info.title}</p>
                                                    {info.pack.map((packInfo) => (
                                                        <p>{packInfo}</p>
                                                    ))}
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pictures__info" id="pictures__info">
                                        {videogame.images.map((image) => (
                                            <img className="videogame__images" src={image} alt="images" />
                                        ))}
                                    </div>
                                    <div className="description__info" id="description__info">
                                        
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="pictures__info" id="pictures__info">
                                        {videogame.images.map((image) => (
                                            <img className="videogame__images" src={image} alt="images" />
                                        ))}
                                    </div>
                                    <div className="description__info" id="description__info">
                                        
                                    </div>
                                </>
                            )}
                        </div>
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