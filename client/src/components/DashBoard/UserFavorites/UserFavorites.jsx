import React from 'react';
import './UserFavorites.scss';

function UserFavorites({favorites}) {

    return (
        <div className='favorite__card__profile' key={favorites.id}>
            <img className='favorite__image' src={favorites.edition.cover} alt="" />
            <div className='favorite__name__edition--container'>
                {favorites.game.dual_title ? (
                    <>
                        <p className='name__title'>{favorites.game.first_title}</p>
                        <p className='name__title'>{favorites.game.second_title}</p>
                        <p>{favorites.edition.name} Edition</p>
                        {favorites.edition.sale ? (
                            <div className="onsale__price--container">
                                <p className="onsale__price">{favorites.edition.salePrice}€</p>
                                <p className="normal__price__onsale">{favorites.edition.price}€</p>
                            </div>
                        ) : (
                            <div className="normal__price--container">
                                <p className="normal__price">{favorites.edition.price}€</p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <p className='name__title'>{favorites.game.first_title}</p>
                        <p>{favorites.edition.name} Edition</p>
                        {favorites.edition.sale ? (
                            <div className="onsale__price--container">
                                <p className="normal__price__onsale">{favorites.edition.price}€</p>
                                <p className="onsale__price">{favorites.edition.salePrice}€</p>
                            </div>
                        ) : (
                            <div className="normal__price--container">
                                <p className="normal__price">{favorites.edition.price}€</p>
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
                            {favorites?.genres?.map((genre) => (
                                <>
                                    {favorites?.genres?.indexOf(genre) < 1 ? (
                                        <p className="genres">{genre}</p>
                                    ) : (
                                        <p className="genres"><span>&nbsp;/	&nbsp;&nbsp;</span>{genre}</p>
                                    )}
                                </>
                            ))}
                        </div>
                        <div className="developer__container">
                                <p className="developer__title">Developer:</p>
                                <p>{favorites?.developer}</p>
                        </div>
                    </div>
                </div>
                <div className="pegi__container">
                    <img className="pegi" src={favorites?.pegi} alt="pegi" />
                </div>
            </div>
            <div className='buttons--container'>
                {favorites.edition.stock ? (
                    <>
                        {favorites.release.released ? (
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
                {/* <button>ADD TO CART</button> */}
                <a href={`/product/${favorites._id}`}>DETAILS</a>
            </div>
        </div>
    )
}

export default UserFavorites;