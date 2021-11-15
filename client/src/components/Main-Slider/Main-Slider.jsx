import React from 'react';
import './Main-Slider.scss';

function MainSlider({ videogames }) {
    return (
        <section className="main-slider">
            <div className="main-slider__gallery">
                <div className="gallery">
                    {videogames.map((mainVideogamesSlider) => (
                        <div className="gallery__slide">
                            <img className="gallery__image" src={mainVideogamesSlider.card} alt={mainVideogamesSlider.id} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="main-slider__small-images">
                <div className="small__image-container">
                    {videogames.map((mainVideogameMiniSlider) => (
                        <div className={`small__image small__slide--${mainVideogameMiniSlider.length + 1}`} style={{backgroundImage: `url(${mainVideogameMiniSlider.card})`}}>
                            <p className="title">{mainVideogameMiniSlider.game.first_title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MainSlider;