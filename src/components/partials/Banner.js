import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Animated } from "react-animated-css";

function Banner() {
    return (
        <header className="bg-banner banner m-0 p-20">
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
               <section id="banner-wrapper" className="w-70 mx-auto">
                    <h1 id="mainHeading" className="m-0 display-inline text-start p-20 font-60 raise-main-heading">
                        IlianaBlog<FontAwesomeIcon icon="book-open" />    
                    </h1>
               </section>
            </Animated>
        </header>)
}

export default Banner;