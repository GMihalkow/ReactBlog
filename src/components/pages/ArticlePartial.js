import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ArticlePartial extends Component {

  trimContent(content){
    if(content.length < 50){
      return content + "...";
    } else{
      return content.substr(0, 50) + "...";
    }
  }

  render() {
    return (
      <div className="mt-25">
          <Link to="/posts" className="text-black"><h1 className="bold text-center m-10 font-40 p-10">{this.props.Title}</h1></Link>
          <p className="text-center m-10">Автор: <span className="bold">Илиана Симеонова</span> / {this.props.Date}</p>
          <img height="500" className="w-100 article-image" alt="article1" src="https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2018/06/edinburgh_meadows_2008_middle_meadow_walk_by_catharine_ward_thompson.jpg?itok=ysmDaSjD&fc=50,50" />
          <p className="text-center">{this.trimContent(this.props.Content)} <a href="#">Прочети повече</a></p>
          <hr/>
      </div>
    )
  }
}

export default ArticlePartial;