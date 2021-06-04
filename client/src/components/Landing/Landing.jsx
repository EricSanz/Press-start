import React from 'react';
import MainSlider from '../Main-Slider/Main-Slider';
import CardSlider from '../Card-Slider/Card-Slider';
import './Landing.scss';

function Landing() {

    return (
        <div className="body">
            <MainSlider />
            <CardSlider />
        </div>
    )
}

export default Landing;

