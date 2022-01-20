import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fillFullVideogameList } from '../../../redux/actions/videogameActions';
import { addFavorite, getUser } from '../../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import './Card.scss';

function Card({Games, loggedUser, cardids, cardIndex, favGamesID}) {

    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user?.data;

    const userId = loggedUser?.uid;
    const videogameId = Games?._id;
    let cardListIndex = cardIndex + 200;
    let gamesID = Games.id;

    const favCardFound = favGamesID?.find(id => id === Games.id);

    const dispatch = useDispatch();

    function displayErrorNoUser() {
        const notloggedId = document.getElementById(gamesID);
        notloggedId.style.display = "none";
    }

    function favoriteGameList() {
        const notloggedId = document.getElementById(gamesID);
        if (!loggedUser) {
            notloggedId.style.display = "block";
            setTimeout(() => (displayErrorNoUser()), 1250 );
        } else {
            dispatch(addFavorite(userId, videogameId));
            dispatch(getUser(localStorageUser.uid));
            const favList = document.getElementById(cardListIndex);
            const cardFound = cardids.find(id => id === Games.id);
            console.log(cardFound);
            const cardFoundIndex = (element) => element === cardFound;
            const index = (cardids.findIndex(cardFoundIndex))
            console.log(index);
            if (index === cardIndex) {
                if (favList) {
                    if (favList.style.color === '#e02d39') {
                        favList.style.color = '#161616';
                    } else if (favList.style.color === '#161616') {
                        favList.style.color = '#e02d39';
                    }
                }
            }
            dispatch(getUser(localStorageUser.uid));
        }
    }

    function cardColor() {
        switch (Games.edition.version) {
            case "PlayStation 4":
                return "videogame__platform--ps4";
            case "PlayStation 5":
                return "videogame__platform--ps5";
            case "PlayStation 4 & PlayStation 5":
                return "videogame__platform--ps4";
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

    function fillList() {
        const fillvideogameList = () => dispatch(fillFullVideogameList());
        setTimeout(fillvideogameList, 1500);
    }

    return (
        <div className="videogame__list">
            <div className="videogame__card">
                {Games.game.dual_title ? (
                    <div className="title__container">
                        <p className="videogame__card-title">{Games.game.first_title}</p>
                        <p className="videogame__card-title">{Games.game.second_title}</p>
                    </div>
                ) : (
                    <div className="title__container">
                        <p className="videogame__card-title">{Games.game.first_title}</p>
                    </div>
                )}
                <div className={cardColor()}>
                    <p>{Games.edition.version}</p>
                </div>
                {!loggedUser && (
                    <FontAwesomeIcon className="heart heart-black" icon="heart" onClick={(() => favoriteGameList())}/>
                )}
                {loggedUser && (
                    <FontAwesomeIcon className={favCardFound ? 'heart heart-red' : 'heart heart-black pulse'} id={cardListIndex} icon="heart" onClick={(() => favoriteGameList())}/>
                )}
                <div id={gamesID} className="notlogged">
                    <p>You are not logged in</p>
                </div>
                <div className="videogame__buy--container">
                    <FontAwesomeIcon icon="shopping-cart" className={Games.edition.stock ? "shopping-cart__green" : "shopping-cart__red"} />
                </div>
                <a href={`product/${Games._id}`} onClick={() => fillList()}>
                    <img className="videogame__card-image" alt={Games.id} src={Games.edition.cover}></img>
                </a>
                <div className="videogame__card-price--container">
                    {Games.edition.sale ? (
                        <>
                            <div className="videogame__onsale-text">
                                <p className="onsale__text">On Sale</p>
                            </div>
                            <div className="videogame__card-price">
                                <p className="price__nosale">{Games.edition.price}€</p>
                                <p className="price__onsale">{Games.edition.salePrice}€</p>
                            </div>
                        </>
                    ) : (
                        <div className="videogame__card-price">
                            <p className="price__onsale">{Games.edition.price}€</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card;