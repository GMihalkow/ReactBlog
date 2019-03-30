import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Animated } from "react-animated-css";
import { Redirect } from 'react-router-dom'

export class Navbar extends Component {
    render(){
        return (
        <div className="bg-nav m-0">
            <Animated animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
                <ul className="m-0 nav">
                    <li className="display-inline m-10"><Link className="text-white bold" to="/">Начало</Link></li>
                    <li className="display-inline m-10"><Link className="text-white bold" to="/posts">За мен</Link></li>
                    <li className="display-inline m-10"><Link className="text-white bold" to="/">Статии</Link></li>
                </ul>
            </Animated>
        </div>
        )
    }
}

export default Navbar;