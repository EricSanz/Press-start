import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import { addFavorite, getUser } from '../../../../redux/actions/userActions';
import './CardFavorites.scss';

function CardFavorite({loggedUser, favoritesCard}) {

    const dispatch = useDispatch();

    console.log(loggedUser);
    const userCardId = loggedUser?.uid;
    const videogameCardId = favoritesCard?._id;

    function generateKey() {
        let key = uuidv4();
        return key;
    }

    function deleleteFavoriteGame() {
        dispatch(addFavorite(userCardId, videogameCardId));
        const newAmountOfFavoritesGames = () => dispatch(getUser(userCardId));
        setTimeout(newAmountOfFavoritesGames, 500);
    }

    return (
            <div className='favorite__card__profile' key={favoritesCard?._id}>
                <img className='favorite__image' src={favoritesCard?.edition?.cover} alt="" />
                <div className='favorite__name__edition--container'>
                    {favoritesCard?.game?.dual_title ? (
                        <>
                            <p className='name__title'>{favoritesCard?.game?.first_title}</p>
                            <p className='name__title'>{favoritesCard?.game?.second_title}</p>
                            <p>{favoritesCard?.edition?.name} Edition</p>
                            {favoritesCard?.edition?.sale ? (
                                <div className="onsale__price--container">
                                    <p className="onsale__price">{favoritesCard?.edition?.salePrice}€</p>
                                    <p className="normal__price__onsale">{favoritesCard?.edition?.price}€</p>
                                </div>
                            ) : (
                                <div className="normal__price--container">
                                    <p className="normal__price">{favoritesCard?.edition?.price}€</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <p className='name__title'>{favoritesCard?.game?.first_title}</p>
                            <p>{favoritesCard?.edition?.name} Edition</p>
                            {favoritesCard?.edition?.sale ? (
                                <div className="onsale__price--container">
                                    <p className="onsale__price">{favoritesCard?.edition?.salePrice}€</p>
                                    <p className="normal__price__onsale">{favoritesCard?.edition?.price}€</p>
                                </div>
                            ) : (
                                <div className="normal__price--container">
                                    <p className="normal__price">{favoritesCard?.edition?.price}€</p>
                                </div>
                            )}
                        </>
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
                                {favoritesCard?.genres?.map((genre) => (
                                    <div key={generateKey()}>
                                        {favoritesCard?.genres?.indexOf(genre) < 1 ? (
                                            <p key={generateKey()} className="genres">{genre}</p>
                                        ) : (
                                            <p key={generateKey()} className="genres"><span>&nbsp;/	&nbsp;&nbsp;</span>{genre}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="developer__container">
                                <p className="developer__title">Developer:</p>
                                <p>{favoritesCard?.developer}</p>
                            </div>
                        </div>
                    </div>
                    <div className="pegi__container">
                        <img className="pegi" src={favoritesCard?.pegi} alt="pegi" />
                    </div>
                </div>
                <div className='buttons--container'>
                    {favoritesCard?.edition?.stock ? (
                        <>
                            {favoritesCard?.release?.released ? (
                                <button>
                                    ADD TO CART
                                </button>
                            ) : (
                                <button className="preorder">
                                    PRE-ORDER
                                </button>
                            )}
                        </>
                    ) : (
                        <button className="sold__out">
                            SOLD OUT
                        </button>
                    )}
                    <a href={`/product/${favoritesCard?._id}`}>DETAILS</a>
                </div>
                <FontAwesomeIcon className="heart__favorite" icon="heart" id="deleteFavorite" onClick={() => deleleteFavoriteGame()}/>

            </div>
    )
}

export default CardFavorite;