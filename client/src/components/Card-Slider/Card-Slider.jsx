import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addFavorite, getUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import './Card-Slider.scss';

function CardSlider({ cards, loggedUser, cardids, cardIndex, favGamesID }) {

    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user?.data;
    const localStorageUserGoogle = userLocalStorage?.user;

    let googleUser = false;
    let emailUser = false;

    if (localStorageUserGoogle !== undefined) {
        googleUser = true;
    }
    if (localStorageUser !== undefined) {
        emailUser = true;
    }

    const userId = loggedUser?.uid;
    const videogameId = cards?._id;
    let newCardIndex = cardIndex + 100;
    let newNewCardIndex = cardIndex + 200;
    const favCardFound = favGamesID?.find(id => id === cards.id);

    const dispatch = useDispatch();

    function displayErrorNone() {
        const notloggedId = document.getElementById(cardIndex);
        notloggedId.style.display = "none";
    }

    function favoriteGame() {
        const notloggedId = document.getElementById(cardIndex);
        if (!loggedUser) {
            const cardFound = cardids.find(id => id === cards.id);
            const cardFoundIndex = (element) => element === cardFound;
            const index = (cardids.findIndex(cardFoundIndex))

            if (index === cardIndex) {
                notloggedId.style.display = "block";
                setTimeout(() => (displayErrorNone()), 1250 );
            }

        } else {
            dispatch(addFavorite(userId, videogameId));
            if (googleUser) {
                dispatch(getUser(localStorageUserGoogle.uid));
            }
            if (emailUser) {
                dispatch(getUser(localStorageUser.uid));
            }
            const fav = document.getElementById(newCardIndex);
            const favTwo = document.getElementById(newNewCardIndex);
            const cardFound = cardids.find(id => id === cards.id);
            const cardFoundIndex = (element) => element === cardFound;
            const index = (cardids.findIndex(cardFoundIndex))
            if (index === cardIndex) {
                if (fav) {
                    if (fav.style.color === '#e02d39') {
                        fav.style.color = '#fff';
                    } else if (fav.style.color === '#fff') {
                        fav.style.color = '#e02d39';
                    }
                }
                if (favTwo) {
                    if (favTwo.style.color === '#e02d39') {
                        favTwo.style.color = '#fff';
                    } else if (favTwo.style.color === '#fff') {
                        favTwo.style.color = '#e02d39';
                    }
                }
            }
            if (googleUser) {
                dispatch(getUser(localStorageUserGoogle.uid));
            }
            if (emailUser) {
                dispatch(getUser(localStorageUser.uid));
            }
        }
    }

    function versionColor() {
        switch (cards.edition.version) {
            case "PlayStation 4":
                return "videogame__platform--ps4";
            case "PlayStation 5":
                return "videogame__platform--ps5";
            case "PlayStation 4 & PlayStation 5":
                return "videogame__platform--playstation";
            case "Xbox One":
                return "videogame__platform--xbox";
            case "Xbox Series S/X":
                return "videogame__platform--xbox";
            case "Xbox One & Xbox Series S/X":
                return "videogame__platform--xbox";
            case "Nintendo Switch":
                return "videogame__platform--nintendo";
            case "PC":
                return "videogame__platform--pc";
            default:
                return "title__container";
        }
    }

    return (
        <div className="cards">
            {cards.edition.sale ? (
                <div className="sale">
                    Sale
                </div>
            ) : null}
            <div className="front">
                <img className="thumbnail" src={cards.card} alt={cards.id} />
                {cards.game.dual_title ? (
                    <>
                        {cards.game.first_title.length > 15 ? (
                            <>
                                {cards.edition.sale ? (
                                    <>
                                        <h3 className="name__first__second__long__sale">{cards.game.first_title}</h3>
                                        <h3 className="name__second__long__sale">{cards.game.second_title}</h3>
                                        <p className="edition__name__second__long__sale">({cards.edition.name} Edition)</p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="name__first__second__long">{cards.game.first_title}</h3>
                                        <h3 className="name__second__long">{cards.game.second_title}</h3>
                                        <p className="edition__name__second__long">({cards.edition.name} Edition)</p>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {cards.edition.sale ? (
                                    <>
                                        <h3 className="name__first__second__sale">{cards.game.first_title}</h3>
                                        <h3 className="name__second__sale">{cards.game.second_title}</h3>
                                        <p className="edition__name__second__sale">({cards.edition.name} Edition)</p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="name__first__second">{cards.game.first_title}</h3>
                                        <h3 className="name__second">{cards.game.second_title}</h3>
                                        <p className="edition__name__second">({cards.edition.name} Edition)</p>
                                    </>
                                )}
                            </>
                        ) }
                    </>
                ) : (
                    <>
                        {cards.game.first_title.length > 15 ? (
                            <>
                                {cards.edition.sale ? (
                                    <>
                                        <h3 className="name__first__long__sale">{cards.game.first_title}</h3>
                                        <p className="edition__name__first__long__sale">({cards.edition.name} Edition)</p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="name__first__long">{cards.game.first_title}</h3>
                                        <p className="edition__name__first__long">({cards.edition.name} Edition)</p>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {cards.edition.sale ? (
                                    <>
                                        <h3 className="name__first__sale">{cards.game.first_title}</h3>
                                        <p className="edition__name__sale">({cards.edition.name} Edition)</p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="name__first">{cards.game.first_title}</h3>
                                        <p className="edition__name">({cards.edition.name} Edition)</p>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
                <div className="information">
                    {cards.edition.sale ? (
                        <p className="price">{cards.edition.salePrice}€</p>
                    ) : (
                        <p className="price">{cards.edition.price}€</p>
                    )}
                    {cards.available_platforms_logos?.length > 4 && (
                        <div className="platforms--5">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                    {cards.available_platforms_logos?.length === 4 && (
                        <div className="platforms--4">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                    {cards.available_platforms_logos?.length === 3 && (
                        <div className="platforms--3">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                    {cards.available_platforms_logos?.length === 2 && (
                        <div className="platforms--2">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                    {cards.available_platforms_logos?.length === 1 && (
                        <div className="platforms--1">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="back">
                {cards.edition.sale === true ? (
                    <div className="prices__info-sale">
                        <div className="prices">
                            <p className="sale__price">{cards.edition.salePrice}€</p>
                            <p className="sale__price__normal">{cards.edition.price}€</p>
                        </div>
                        {!loggedUser && (
                            <FontAwesomeIcon className="add-favorite" icon="heart" onClick={(() => favoriteGame())}/>
                        )}
                        {loggedUser && (
                            <FontAwesomeIcon className={favCardFound ? 'add-favorite red' : 'add-favorite white'} id={newNewCardIndex} icon="heart" onClick={(() => favoriteGame())}/>
                        )}
                        <div id={cardIndex} className="notlogged notlogged-sale">
                            <p>You are not logged in</p>
                        </div>
                    </div>
                ) : (
                    <div className="prices__info">
                        <p className="price">{cards.edition.price}€</p>
                        {!loggedUser && (
                            <FontAwesomeIcon className="add-favorite" icon="heart" onClick={(() => favoriteGame())}/>
                        )}
                        {loggedUser && (
                            <FontAwesomeIcon className={favCardFound ? 'add-favorite red' : 'add-favorite white'} id={newCardIndex} icon="heart" onClick={(() => favoriteGame())}/>
                        )}
                        <div id={cardIndex} className="notlogged">
                            <p>You are not logged in</p>
                        </div>
                    </div>
                )}
                <div className="platforms">
                    <p>Available in</p>
                    {cards.available_platforms_logos?.length > 4 && (
                        <div className="platforms--5__back">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                    {cards.available_platforms_logos?.length === 4 && (
                        <div className="platforms--4__back">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                    {cards.available_platforms_logos?.length === 3 && (
                        <div className="platforms--3__back">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                    {cards.available_platforms_logos?.length === 2 && (
                        <div className="platforms--2__back">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                    {cards.available_platforms_logos?.length === 1 && (
                        <div className="platforms--1__back">
                            {cards.available_platforms_logos.map((logos) => (
                                <img src={logos} alt={logos} />
                            ))}
                        </div>
                    )}
                </div>
                <a className="btn" id={cards._id} href={`product/${cards._id}`}>See more details</a>
            </div>
            <div className="background">
                <div className={versionColor()}>
                </div>
            </div>
        </div>
    )
}

export default CardSlider;