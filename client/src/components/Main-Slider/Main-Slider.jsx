import React from 'react';
import './Main-Slider.scss';

function MainSlider() {
    return (
        <section className="main-slider">
            <div className="main-slider__big-images">
                <div className="big__image-container">
                    <img src="https://i.ibb.co/qN5WjBp/immortals-fenyx-rising-main-slider.jpg" alt="immortals-fenyx-rising-main-slider" />
                </div>
            </div>
            <div className="main-slider__small-images">
                <div className="small__image-container">
                    <div className="small__image">
                        <p className="title">Immortals Fenyx Rising</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainSlider;