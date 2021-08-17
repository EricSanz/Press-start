import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fillFullVideogameList } from '../../../redux/actions/videogameActions';
import './Card.scss';

function Card({Games, dispatch}) {

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
                <div className="videogame__favorite--container">
                    <FontAwesomeIcon className="heart-icon" icon="heart"/>
                </div>
                <div className="videogame__buy--container">
                    <FontAwesomeIcon icon="shopping-cart" className={Games.edition.stock ? "shopping-cart__green" : "shopping-cart__red"} />
                </div>
                <Link to={`product/${Games._id}`} onClick={() => dispatch(fillFullVideogameList())}>
                    <img className="videogame__card-image" alt={Games.id} src={Games.edition.cover}></img>
                </Link>
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

function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        filteredVideogameList: videogameReducer.filteredVideogameList,
        platformVideogames: videogameReducer.platformVideogames,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

export default connect(mapStateToProps)(Card);