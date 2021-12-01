import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Main-Slider.scss';

function MainSlider({ videogames }) {

    const gameImgs = document?.querySelectorAll('.main__slider--container img');
    const leftArrow = document.querySelector('.arrow__left');
    const rightArrow = document.querySelector('.arrow__right');
    let currentIndex = 0;
    let time = 10000;

    leftArrow?.addEventListener('click', function () {
        currentIndex <= 0 ? currentIndex = gameImgs.length - 1 : currentIndex--;
        autoSlider(0, currentIndex);
    });

    rightArrow?.addEventListener('click', function(){
        currentIndex >= gameImgs.length - 1 ? currentIndex = 0 : currentIndex++;
        autoSlider(0, currentIndex);
    })

    const autoSlider = (startPos, index) => {
        if (gameImgs.length) {
            for (let i = startPos; i < gameImgs.length; i++) {
                gameImgs[i].style.display = 'none';
            }
            gameImgs[index].style.display = 'block';
        }
    };

    autoSlider(1,0);
    const startAutoSlide = () => {

        setInterval(() => {
            currentIndex >= gameImgs.length - 1 ? currentIndex = 0 : currentIndex++;
            autoSlider(0, currentIndex);
        }, time);
    };

    startAutoSlide();

    return (
        <section className="main__slider--container">
            <div className="arrow arrow__left">
                <FontAwesomeIcon className="arrow__left--icon" icon="angle-double-left"/>
            </div>
            <div className="arrow arrow__right">
                <FontAwesomeIcon className="arrow__right--icon" icon="angle-double-right"/>
            </div>
            {videogames.map((mainVideogamesSlider) => (
                <img className="slider__img" src={mainVideogamesSlider.card} alt={mainVideogamesSlider.id} />
            ))}
            <div className="slider__options">
                {videogames.map((videogamesNames) => (
                    <div className="options">
                        {videogamesNames.game.dual_title ? (
                            <p>{videogamesNames.game.first_title}&nbsp;<span>{videogamesNames.game.second_title}</span></p>
                        ) : (
                            <p>{videogamesNames.game.first_title}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MainSlider;