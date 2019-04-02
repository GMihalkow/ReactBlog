import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Animated } from "react-animated-css";

export class Navbar extends Component {
    render(){
        return (
        <div className="bg-nav m-0">
            <Animated animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
                <ul className="m-0 nav">
                    <li className="display-inline"><a className="text-white p-20 bold raise-nav-btn" href="/">Начало</a></li>
                    <li className="display-inline"><Link className="text-white text-end p-20 bold raise-nav-btn" to="/articles">Статии</Link></li>
                    <li className="display-inline"><Link className="text-white text-end p-20 bold raise-nav-btn" to="/about">За мен</Link></li>
                </ul>
            </Animated>
        </div>
        )
    }
}

export default Navbar;