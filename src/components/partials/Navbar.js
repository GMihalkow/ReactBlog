import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    render(){
        return (
            <ul className="m-10 nav text-end display-inline">
                <li className="display-inline"><Link to="/" className="text-white p-20 bold raise-nav-btn">Начало</Link></li>
                <li className="display-inline"><Link className="text-white text-end p-20 bold raise-nav-btn" to="/articles">Статии</Link></li>
                <li className="display-inline"><Link className="text-white text-end p-20 bold raise-nav-btn" to="/about">За мен</Link></li>
            </ul>
        )
    }
}

export default Navbar;