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
                    <div className="small__image-1">
                        <p className="title">Immortals Fenyx Rising</p>
                    </div>
                    <div className="small__image-2">
                        <p className="title">Far Cry 6</p>
                    </div>
                    <div className="small__image-3">
                        <p className="title">Ghost of Tsushima</p>
                    </div>
                    <div className="small__image-4">
                        <p className="title">Resident Evil Village</p>
                    </div>
                    <div className="small__image-5">
                        <p className="title">No Man's Sky</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainSlider;