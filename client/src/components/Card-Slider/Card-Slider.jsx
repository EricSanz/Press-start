import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Card-Slider.scss';

function CardSlider({ cards }) {
    return (
        <div className="game">
            {cards.edition.sale ? (
                <div className="rank">
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
                                    </>
                                ) : (
                                    <>
                                        <h3 className="name__first__second__long">{cards.game.first_title}</h3>
                                        <h3 className="name__second__long">{cards.game.second_title}</h3>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {cards.edition.sale ? (
                                    <>
                                        <h3 className="name__first__second__sale">{cards.game.first_title}</h3>
                                        <h3 className="name__second__sale">{cards.game.second_title}</h3>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="name__first__second">{cards.game.first_title}</h3>
                                        <h3 className="name__second">{cards.game.second_title}</h3>
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
                                    <h3 className="name__first__long__sale">{cards.game.first_title}</h3>
                                ) : (
                                    <h3 className="name__first__long">{cards.game.first_title}</h3>
                                )}
                            </>
                        ) : (
                            <>
                                {cards.edition.sale ? (
                                    <h3 className="name__first__sale">{cards.game.first_title}</h3>
                                ) : (
                                    <h3 className="name__first">{cards.game.first_title}</h3>
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
                        <p className="prices">{cards.edition.salePrice}€<span>{cards.edition.price}€</span></p>
                        <FontAwesomeIcon className="add-favorite" icon="heart"/>
                        {/* <p className="prices">{cards.edition.price}€</p> */}
                    </div>
                ) : (
                    <div className="prices__info">
                        <p className="prices">{cards.edition.price}€</p>
                        <FontAwesomeIcon className="add-favorite" icon="heart"/>
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
                <button className="btn">See more details</button>
            </div>
            <div className="background">

            </div>
        </div>
    )
}

export default CardSlider;