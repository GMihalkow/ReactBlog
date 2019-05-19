import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './DropdownNavBar';
import { Animated } from "react-animated-css";

export class Navbar extends Component {
    render(){
        return (
            <nav id="nav-section" className="w-70 bg-banner position-relative mx-auto">
                <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                    <ul id="navigation" className=" p-20 nav text-end display-inline">
                        <li className="display-inline"><Link to="/" className="text-white p-20 bold raise-nav-btn">Начало</Link></li>
                        <li className="display-inline"><Link className="text-white text-end p-20 bold raise-nav-btn" to="/articles">Статии</Link></li>
                        <li className="display-inline"><Link className="text-white text-end p-20 bold raise-nav-btn" to="/about">За мен</Link></li>
                    </ul>
                    <Dropdown />
                </Animated>
            </nav>
        )
    }
}

export default Navbar;