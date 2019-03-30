import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class CreateArticle extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    let commandName = e.target.value.split("-")[0];
    let commandValue = e.target.value.split("-")[1];
    document.execCommand(commandName, false, commandValue);
    
    document.getElementById("articleTextArea").blur();
    
  }

  render() {
    return (
      <div id="main">
        <h1 className="text-center">Създай статия</h1>
        <div className="text-center">
          <button onClick={(e) => {this.onClick(e)}} className="bg-nav border-none m-10 p-10 br-5 outline-none text-white" value="bold-"><FontAwesomeIcon icon="bold" /></button>
          <button onClick={(e) => {this.onClick(e)}} className="bg-nav border-none m-10 p-10 br-5 outline-none text-white" value="justifyCenter-"><FontAwesomeIcon icon="align-center" /></button>
          <button onClick={(e) => {this.onClick(e)}} className="bg-nav border-none m-10 p-10 br-5 outline-none text-white" value="italic-"><FontAwesomeIcon icon="italic" /></button>
          <button onClick={(e) => {this.onClick(e)}} className="bg-nav border-none m-10 p-10 br-5 outline-none text-white" value="undo-"><FontAwesomeIcon icon="undo" /></button>
          <select id="fontSizeSelect" class="p-10 bg-nav text-white bold" onChange={(e) => {this.onClick(e)}}>
            <option selected="selected">Размер на шрифт</option>
            <option value="fontSize-1">1</option>
            <option value="fontSize-2">2</option>
            <option value="fontSize-3">3</option>
            <option value="fontSize-4">4</option>
            <option value="fontSize-5">5</option>
            <option value="fontSize-6">6</option>
            <option value="fontSize-7">7</option>
          </select>
        </div>
        <div id="articleTextArea" contentEditable="true" className="overflow-auto w-50 articleText mx-auto"></div>
        <div className="text-center mx-auto w-30 p-20">
          <button className="blogBtn float-left bg-nav text-white">Отказ</button>
          <button className="blogBtn float-right bg-nav text-white">Създай</button>
        </div>
      </div>
    )
  }
}

export default CreateArticle;