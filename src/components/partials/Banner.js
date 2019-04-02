import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Animated } from "react-animated-css";

function Banner() {
    return (
        <header className="bg-banner banner m-0">
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                <h1 className="m-0 p-20 text-center raise-main-heading">
                    <span id="mainHeading">LifeGuide<FontAwesomeIcon icon="book-open" /></span></h1>
            </Animated>
        </header>)
}

export default Banner;