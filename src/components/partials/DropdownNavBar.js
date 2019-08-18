import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './css/dropdown.css';

export class DropdownNavBar extends Component {
  componentDidMount(){
    let menu = document.querySelector(".dropdown");
    let content = document.querySelector(".dropdown-content");

    menu.addEventListener("click", function(e){
      let btn = e.currentTarget;

      if(btn.classList.contains("active.dropdown")){
        btn.classList.remove("active.dropdown");
        
        content.style.display = "none";
      } else {
        btn.classList.add("active.dropdown");
        
        content.style.display = "block";
      }
    });
  }
  
  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn"><FontAwesomeIcon id="dropdown-icon" icon="bars" size="lg" /></button>
        <div className="dropdown-content display-none">
          <Link to="/" className="bold">Начало</Link>
          <Link to="/articles" className="bold">Статии</Link>
          <Link to="/about" className="bold">За мен</Link>
        </div>
      </div>
    )
  }
}

export default DropdownNavBar;