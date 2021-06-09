import React from 'react';
import videogames from './card-mockup';
import './Card-Slider.scss';

function CardSlider() {
    return (
        <section className="card-slider__container">
            <div className="card-slider__title-container">
                <span className="card-slider__title">All Videogames</span>
            </div>
            <div className="scrollable__card">
                {videogames.map((videogame) => (
                    <div className="card">
                        {videogame.true ?
                            <img class="card__cover" src={videogame.cover} alt={videogame.name} />
                            : null}
                        {videogame.true ?
                            <span className="card__title">{videogame.name}</span>
                            : null}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CardSlider;