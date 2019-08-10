import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './DropdownNavBar';
import { Animated } from "react-animated-css";

export class Navbar extends Component {
    render(){
        return (
            <nav id="nav-section" className="nav-wrapper p-5 position-relative mx-auto mx-auto">
                <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                    <ul id="navigation" className="nav text-center mx-auto">
                        <li className="display-inline-block "><Link to="/" className="bold raise-nav-btn">Начало</Link></li>
                        <li className="display-inline-block "><Link className="bold raise-nav-btn" to="/articles">Статии</Link></li>
                        <li className="display-inline-block "><Link className="bold raise-nav-btn" to="/about">За мен</Link></li>
                    </ul>
                    <Dropdown />
                </Animated>
            </nav>
        )
    }
}

export default Navbar;