/* eslint-disable no-loop-func */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Main-Slider.scss';

function MainSlider({ videogames, sliderIds }) {

    const gameImgs = document?.querySelectorAll('.main__slider--container img');
    const gameNames = document?.querySelectorAll('.options');
    const gameLinks = document?.querySelectorAll('.info__container');
    const leftArrow = document.querySelector('.arrow__left');
    const rightArrow = document.querySelector('.arrow__right');

    let time = 10000;
    let currentIndex = 0;
    
    const autoSlider = (startPos, index) => {
        if (gameImgs.length) {
            for (let i = startPos; i < gameImgs.length; i++) {
                gameImgs[i].style.display = 'none';
                gameLinks[i].style.display = 'none';
                gameNames[i].style.backgroundColor = '#fff';
            }
            gameImgs[index].style.display = 'block';
            gameLinks[index].style.display = 'block';
            gameNames[index].style.backgroundColor = '#e8a92c';
        }
    };

    autoSlider(1,0);

    leftArrow?.addEventListener('click', function () {
        currentIndex <= 0 ? currentIndex = gameImgs.length - 1 : currentIndex--;
        autoSlider(0, currentIndex);
    });

    rightArrow?.addEventListener('click', function(){
        currentIndex >= gameImgs.length - 1 ? currentIndex = 0 : currentIndex++;
        autoSlider(0, currentIndex);
    });

    for (let i = 0; i < gameNames.length; i++) {
        gameNames[i].addEventListener('click', function({target}){
            let index = 0;
            let targetID = parseFloat(target.id);
            const sliderFound = sliderIds.find(id => id === targetID);
            const sliderFoundIndex = (element) => element === sliderFound;
            index = (sliderIds.findIndex(sliderFoundIndex));
            for (let j = 0; j < gameNames.length; j++) {
                gameNames[j].style.backgroundColor = '#fff';
            }
            gameNames[index].style.backgroundColor = '#ecbc5a';

            currentIndex = index;
            autoSlider(0, currentIndex);
        })
    }

    function sliderIndexInterval() {
        currentIndex >= gameImgs.length - 1 ? currentIndex = 0 : currentIndex++;
        autoSlider(0, currentIndex);
    }
    
    const startAutoSlide = () => setInterval(sliderIndexInterval, time);
    
    if (sliderIds.length > 0) {
        startAutoSlide();
    }

    return (
        <section className="main__slider--container">
            <div className="arrow arrow__left">
                <FontAwesomeIcon className="arrow__left--icon" icon="angle-double-left"/>
            </div>
            <div className="arrow arrow__right">
                <FontAwesomeIcon className="arrow__right--icon" icon="angle-double-right"/>
            </div>
            {videogames.map((mainVideogamesSlider) => (
                <>
                    <img className="slider__img" src={mainVideogamesSlider.main_slider} alt={mainVideogamesSlider.id} />
                    <div className="info__container">
                        <div className="info__triangle"></div>
                        {mainVideogamesSlider.game.dual_title ? (
                                <p className='info__title--first__title'>{mainVideogamesSlider.game.first_title} <span>{mainVideogamesSlider.game.second_title}</span></p>
                        ) : (
                            <p className='info__title'>{mainVideogamesSlider.game.first_title}</p>
                        )}
                        <p className='info__price'>From: {mainVideogamesSlider.edition.price}???</p>
                        <a className="more__details" id={mainVideogamesSlider._id} href={`product/${mainVideogamesSlider._id}`}>More details</a>
                    </div>
                </>
            ))}
            <div className="slider__options">
                {videogames.map((videogamesNames) => (
                    <div key={videogamesNames.id} className="options" id={videogamesNames.id}>
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