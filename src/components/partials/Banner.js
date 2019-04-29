import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Animated } from "react-animated-css";
import Nav from './Navbar';
import { Link } from 'react-router-dom';
import Dropdown from './DropdownNavBar';

function Banner() {
    return (
        <header className="bg-banner banner m-0">
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
               <div id="banner-wrapper" className="equal-shared-grid mx-auto">
                    <div>
                        <h1 id="mainHeading" className="m-0 display-inline text-start p-20 raise-main-heading">
                        <span >Iliana'sBlog
                        <FontAwesomeIcon icon="book-open" />
                        </span>
                        </h1>
                        <Link to="/" className="text-white">
                            <span id="little-heading" className="p-10"><FontAwesomeIcon icon="book-open" size="lg"/>
                            </span>
                        </Link>
                    </div>
                    <div id="nav-section" className="position-relative">
                        <Nav />
                        <Dropdown />
                    </div>
               </div>
            </Animated>
        </header>)
}

export default Banner;