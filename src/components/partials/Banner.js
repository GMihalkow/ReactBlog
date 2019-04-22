import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Animated } from "react-animated-css";
import Nav from './Navbar';

function Banner() {
    return (
        <header className="bg-banner banner m-0">
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
               <div className="equal-shared-grid mx-auto">
                <div>
                    <h1 className="m-0 display-inline text-start p-20 raise-main-heading">
                    <span id="mainHeading">Iliana'sBlog
                    <FontAwesomeIcon icon="book-open" />
                    </span></h1>
                </div>
                <div className="position-relative">
                    <Nav />
                </div>
               </div>
            </Animated>
        </header>)
}

export default Banner;