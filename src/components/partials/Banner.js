import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Animated } from "react-animated-css";
import Nav from './Navbar';
import Dropdown from './DropdownNavBar';

function Banner() {
    return (
        <header className="bg-banner banner m-0">
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
               <div id="banner-wrapper" className="equal-shared-grid mx-auto">
                    <div>
                        <h1 id="mainHeading" className="m-0 display-inline text-start p-20 raise-main-heading">
                            IlianaBlog
                            <FontAwesomeIcon icon="book-open" />    
                        </h1>
                    </div>
                    <nav id="nav-section" className="position-relative">
                        <Nav />
                    </nav>
               </div>
               <Dropdown />
            </Animated>
        </header>)
}

export default Banner;