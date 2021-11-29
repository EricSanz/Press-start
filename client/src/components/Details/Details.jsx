import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadOneVideogame } from '../../redux/actions/videogameActions';
import { getUser } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../Loading/Loading';
import EditionButton from './Edition-Button/Edition-Button';
import PlatformButton from './Platform-Button/Platform-Button';
import Popup from 'reactjs-popup';
import './Pop-Up/Popup.scss';
import './Details.scss';

function Details ({videogame, match, loading, user}) {

    const [id] = useState(match.params.videogameId);
    const [expandShipping, setExpandShipping] = useState(true); 
    const [expandWarranty, setExpandWarranty] = useState(true);
    const [expandReturn, setExpandReturn] = useState(true);

    const dispatch = useDispatch();

    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user?.data;

    useEffect(() => {
        if (!videogame || videogame._id !== id) {
            dispatch(loadOneVideogame(id))
        }

        if (!user && localStorageUser) {
            dispatch(getUser(localStorageUser.uid))
        }

    }, [dispatch, user, videogame, id, localStorageUser])

    function expandInfo({target}) {

        switch (target.id) {
            case 'shipping':
                const shipping = document.getElementById('shipping__conditions');
                const shipping_title = document.getElementById('shipping__title');
                const shipping_icon = document.getElementById('shipping__icon');
                setExpandShipping(!expandShipping);
                expandShipping ? shipping.style.display = 'flex' : shipping.style.display = 'none';
                expandShipping ? shipping_title.style.backgroundColor = '#f0f2f2' : shipping_title.style.backgroundColor = '#fff';
                expandShipping ? shipping_icon.style.transform = 'rotate(180deg)' : shipping_icon.style.transform = 'rotate(0deg)';
                break;
            case 'warranty':
                const warranty = document.getElementById('product__warranty');
                const warranty_title = document.getElementById('warranty__title');
                const warranty_icon = document.getElementById('warranty__icon');
                setExpandWarranty(!expandWarranty);
                expandWarranty ? warranty.style.display = 'flex' : warranty.style.display = 'none';
                expandWarranty ? warranty_title.style.backgroundColor = '#f0f2f2' : warranty_title.style.backgroundColor = '#fff';
                expandWarranty ? warranty_icon.style.transform = 'rotate(180deg)' : warranty_icon.style.transform = 'rotate(0deg)';
                
                break;
            case 'return':
                const returnConditions = document.getElementById('return__conditions');
                const return_title = document.getElementById('return__title');
                const return_icon = document.getElementById('return__icon');
                setExpandReturn(!expandReturn);
                expandReturn ? returnConditions.style.display = 'flex' : returnConditions.style.display = 'none';
                expandReturn ? return_title.style.backgroundColor = '#f0f2f2' : return_title.style.backgroundColor = '#fff';
                expandReturn ? return_icon.style.transform = 'rotate(180deg)' : return_icon.style.transform = 'rotate(0deg)';
                break;
            default:
                break;
        }

    }

    function selectedTabOption({target}) {
        const contentOption = document.getElementById('label__content');
        const contentInfo = document.getElementById('content__info');
        const picturesInfo = document.getElementById('pictures__info');
        const descriptionInfo = document.getElementById('description__info');

        if (target.value === 'pictures' ) {
            contentOption.style.backgroundColor = '#161616';
            contentOption.style.color = '#fff';
            contentOption.style.fontWeight = '600';
            picturesInfo.style.display = 'block';
            contentInfo.style.display = 'none';
            descriptionInfo.style.display = 'none';
        }

        if (target.value === 'description') {
            contentOption.style.backgroundColor = '#161616';
            contentOption.style.color = '#fff';
            contentOption.style.fontWeight = '600';
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
            picturesOption.style.fontWeight = '600'
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
        <main className="main">
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
                            <div className={videogame.edition.stock ? "price__cart--option in__stock" : "price__cart--option"}>
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
                                            <>
                                                <button className="add__cart__container">
                                                    <p>ADD TO CART</p>
                                                </button>
                                                <p className="in__stock--p">In Stock <span><FontAwesomeIcon className="check__icon" icon="check-circle"/></span>&nbsp; Immediate shipping! &nbsp; <Link to="/delivering-options" className="link__info" >+ Info</Link></p>
                                            </>

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
                                                <>
                                                    {videogame.genres.indexOf(genre) < 1 ? (
                                                        <p className="genres">{genre}</p>
                                                    ) : (
                                                        <p className="genres"><span>&nbsp;/	&nbsp;&nbsp;</span>{genre}</p>
                                                    )}
                                                </>
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
                        <div className="conditions__warranty--container">
                            <div className="shipping__conditions--title" id="shipping__title">
                                <p id="shipping" onClick={(id) => expandInfo(id)}>Shipping Conditions:<span><FontAwesomeIcon id="shipping__icon" className="icons" icon="angle-double-down"/></span></p>  
                                <div id="shipping__conditions" className="shipping__conditions--content">
                                    <p>Press Start guarantees the immediate shipment of all products available at the time of order confirmation as long as it is on a working day and before 18:00 hours. Orders confirmed after 18:00 hours or during holidays, Saturdays and Sundays, will be handled the first working day after it. We have a 24-48 hours delivery service for the whole Peninsula and different options for the Canary Islands, Andorra, Ceuta, Melilla and the rest of Europe. In the case of product reservations, the delivery of the product will be made on the day of the official launch. For digital products, delivery is made by e-mail to the e-mail address registered with the account. The redemption code is sent immediately after order confirmation with your payment.</p>
                                </div>
                            </div>
                            <div className="product__warranty--title" id="warranty__title">
                                <p id="warranty" onClick={(id) => expandInfo(id)}>Product Warranty:<span><FontAwesomeIcon id="warranty__icon" className="icons" icon="angle-double-down"/></span></p>
                                <div id="product__warranty" className="product__warranty--content">
                                    <p>When the delivered products do not conform to the contract or have defects within two years from the date of delivery, users may contact xtralife via email tienda@xtralife.com. The users must inform xtralife of the lack of conformity of the products within two months after they have knowledge of them. xtralife will carry out the collection of the product to the effects of examining the defect and to proceed, in its case, to the repair or substitution of the same one, in accordance with the established in the General Law for the Defense of the Consumers and Users. In cases where the user could not demand the repair or replacement of the product, the price will be reduced or the contract will be terminated, at the user's option.<br/>For more information, see our Terms and Conditions.</p>
                                </div>
                            </div>
                            <div className="return__conditions--title" id="return__title">
                                <p id="return" onClick={(id) => expandInfo(id)}>Return Conditions:<span><FontAwesomeIcon id="return__icon" className="icons" icon="angle-double-down"/></span></p>
                                <div id="return__conditions" className="return__conditions--content">
                                    <p>Users may request the return of the products within 14 calendar days of receipt, without having to justify their decision and without penalty of any kind, via email to tienda@xtralife.com or by making any other unequivocal statement indicating their decision to withdraw from the contract. Under no circumstances may video games or software products that have been opened and/or unsealed and/or clearly used by the user after delivery, as well as software downloads and/or products with digital content that are not provided on a material support be returned. <br/>For more information, see our Terms and Conditions.</p>
                                </div>
                            </div>
                        </div>
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
                                    <div className="content__info content__info--image" id="content__info">
                                        {videogame.edition.content_image[0] === '' ? null : (
                                            <div className="content__image--container">
                                                {videogame.edition.content_image.map((contentImage) => (
                                                    <Popup trigger={<img className="content__image" src={contentImage} alt={videogame.game.first_title} />} modal nested>
                                                        {close => (
                                                            <div className="modal">
                                                                <div className="modal__content">
                                                                    <button className="close__modal" onClick={close} >
                                                                        <FontAwesomeIcon className="times-icon" icon="times"/>
                                                                    </button>
                                                                    <img className="modal__image" src={contentImage} alt={videogame.game.first_title} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                ))}
                                            </div>
                                        )}
                                        <div className="content__info__pack">
                                            {videogame.edition.content.map((info) => (
                                                <>
                                                    <p className="packInfo__title">{info.title}</p>
                                                    {info.pack.map((packInfo) => (
                                                        <p className="packInfo__list">{packInfo}</p>
                                                    ))}
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pictures__info" id="pictures__info">
                                        {videogame.images.map((image) => (
                                            <Popup trigger={<img className="videogame__images" src={image} alt="images" />} modal nested>
                                                {close => (
                                                    <div className="modal">
                                                        <div className="modal__content">
                                                            <button className="close__modal" onClick={close} >
                                                                <FontAwesomeIcon className="times-icon" icon="times"/>
                                                            </button>
                                                            <img className="modal__image" src={image} alt="images" />
                                                        </div>
                                                    </div>
                                                )}
                                            </Popup>
                                        ))}
                                    </div>
                                    <div className="description__info" id="description__info">
                                        {videogame.description.map((global_title) => (
                                            <p className="description__global__title">{global_title.global}</p>
                                        ))}
                                        {videogame.description.map((videogame) => (
                                            <>
                                                {videogame.features.map((featuresTitle) => (
                                                    <>
                                                        <p className="features__title">{featuresTitle.title}</p>
                                                        {featuresTitle.text.map((featuresInfo) => (
                                                            <p className="features__text">{featuresInfo}</p>
                                                        ))}
                                                    </>
                                                ))}
                                            </>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="pictures__info pictures__active" id="pictures__info">
                                        {videogame.images.map((image) => (
                                            <Popup trigger={<img className="videogame__images" src={image} alt="images" />} modal nested>
                                                {close => (
                                                    <div className="modal">
                                                        <div className="modal__content">
                                                            <button className="close__modal" onClick={close} >
                                                                <FontAwesomeIcon className="times-icon" icon="times"/>
                                                            </button>
                                                            <img className="modal__image" src={image} alt="images" />
                                                        </div>
                                                    </div>
                                                )}
                                            </Popup>
                                        ))}
                                    </div>
                                    <div className="description__info" id="description__info">
                                        {videogame.description.map((global_title) => (
                                            <p className="description__global__title">{global_title.global}</p>
                                        ))}
                                        {videogame.description.map((videogame) => (
                                            <>
                                                {videogame.features.map((featuresTitle) => (
                                                    <>
                                                        <p className="features__title">{featuresTitle.title}</p>
                                                        {featuresTitle.text.map((featuresInfo) => (
                                                            <p className="features__text">{featuresInfo}</p>
                                                        ))}
                                                    </>
                                                ))}
                                            </>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
};

function mapStateToProps({videogameReducer, userReducer}) {
    return {
        videogame: videogameReducer.videogame,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
        cardIds: videogameReducer.cardIds,
        user: userReducer.user,
        favoritesGamesID: userReducer.favoritesGamesID,
    }
}

export default connect(mapStateToProps)(Details);