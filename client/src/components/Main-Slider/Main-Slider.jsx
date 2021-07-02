import React from 'react';
import './Main-Slider.scss';

function MainSlider() {
    return (
        <section className="main-slider">
            <div className="main-slider__gallery">
                <div className="gallery">
                    <div className="gallery__slide gallery__slide--1">First slide</div>
                    <div className="gallery__slide gallery__slide--2">Second slide</div>
                    <div className="gallery__slide gallery__slide--3">Third slide</div>
                    <div className="gallery__slide gallery__slide--4">Fourth slide</div>
                    <div className="gallery__slide gallery__slide--5">Fifth slide</div>
                </div>
            </div>
            <div className="main-slider__small-images">
                <div className="small__image-container">
                    <div className="small__image-1 small__slide--1">
                        <p className="title">Immortals Fenyx Rising</p>
                    </div>
                    <div className="small__image-2 small__slide--2">
                        <p className="title">Far Cry 6</p>
                    </div>
                    <div className="small__image-3 small__slide--3" >
                        <p className="title">Ghost of Tsushima</p>
                    </div>
                    <div className="small__image-4 small__slide--4">
                        <p className="title">Resident Evil Village</p>
                    </div>
                    <div className="small__image-5 small__slide--5">
                        <p className="title">No Man's Sky</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainSlider;