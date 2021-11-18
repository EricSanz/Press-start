import React from 'react';
import videogames from './card-mockup';
import './Card-Slider.scss';

function CardSlider({ cards }) {
    return (
        <div className="game">
            {cards.edition.sale ? (
                <div className="rank">
                    Sale
                    {/* <p className="sale">Sale</p> */}
                </div>
            ) : null}
            <div className="front">
                <img className="thumbnail" src={cards.card} alt={cards.id} />
                {cards.game.dual_title ? (
                    <>
                        {cards.game.first_title.length > 15 ? (
                            <>
                                {/* <h3 className="name__first__second__long">{cards.game.first_title}&nbsp;<span>{cards.game.second_title}</span></h3> */}
                                <h3 className="name__first__second__long">{cards.game.first_title}</h3>
                                <h3 className="name__second__long">{cards.game.second_title}</h3>
                            </>
                        ) : (
                            <>
                            {/* <h3 className="name__first__second">{cards.game.first_title}&nbsp;<span>{cards.game.second_title}</span></h3> */}
                            <h3 className="name__first__second">{cards.game.first_title}</h3>
                            <h3 className="name__second">{cards.game.second_title}</h3>
                            </>
                        ) }
                        {/* <h3 className="name__second">{cards.game.second_title}</h3> */}
                    </>
                ) : (
                    <h3 className="name__first">{cards.game.first_title}</h3>
                    // <>
                    //     {cards.game.first_title.length > 15 ? (
                    //         <h3 className="name__first__long">{cards.game.first_title}</h3>
                    //     ) : (
                    //         <h3 className="name__first">{cards.game.first_title}</h3>
                    //     )}
                    // </>
                )}
                <div className="stats">
                    {cards.edition.sale ? (
                        <p className="price">{cards.edition.salePrice}€</p>
                    ) : (
                        <p className="price">{cards.edition.price}€</p>
                    )}
                    <div className="streamers">
                        {cards.available_platforms_logos?.length > 0 && cards.available_platforms_logos.map((logos) => (
                            <img src={logos} alt={logos} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="back">
                <div className="streamer-info">
                    {cards.edition.sale ? (
                        <>
                            <p className="game-stat">{cards.edition.price}€<span>{cards.edition.salePrice}€</span></p>
                            <p className="game-stat">On sale <span>{cards.edition.stock ? ('In stock') : 'Out of stock'}</span></p>
                        </>
                    ) : (
                        <>
                            <p className="game-stat">{cards.edition.price}€</p>
                            <p className="game-stat">{cards.edition.stock ? ('In stock') : ('Out of stock')}</p>
                        </>
                    )}
                    {/* <p className="game-stat">{cards.edition.price}€</p>
                    <p className="game-stat">25.8k<span>Streams</span></p> */}
                </div>
                <button className="btn">See more details</button>
                <div className="streamers">
                    <div className="streamer">
                        <div className="icon"><img src={cards.edition.card} alt="" /></div>
                        <p className="name">Gamer 1</p>
                        <p className="number">36.1k</p>
                    </div>
                    <div className="streamer">
                        <div className="icon"><img src={cards.edition.card} alt="" /></div>
                        <p className="name">Gamer 2</p>
                        <p className="number">35.2k</p>
                    </div>
                    <div className="streamer">
                        <div className="icon"><img src={cards.edition.card} alt="" /></div>
                        <p className="name">Gamer 3</p>
                        <p className="number">30.5k</p>
                    </div>
                </div>
            </div>
            <div className="background">

            </div>
        </div>
    )
}

export default CardSlider;