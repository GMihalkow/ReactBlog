import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ArticlePartial extends Component {

  trimContent(content){
    if(content.length < 50){
      return content + "...<a href='/articles/" + this.props.Id + "'>Прочети повече</a>";
    } else{
      return content.substr(0, 50) + "...<a href='/article/" + this.props.Id + "'>Прочети повече</a>"
    }
  }

  render() {
    const articleLink = "/article/" + this.props.Id;
    
    return (
      <div className="mt-50">
          <h1 className="bold text-center m-10 font-40 p-10"><Link to={articleLink} className="text-black">{this.props.Title}</Link></h1>
          <p className="text-center m-10">Автор: <span className="bold">{this.props.Author}</span> / {this.props.Date}</p>
          <Link to={articleLink} className="text-black"><img height="500" className="w-100 article-image" alt="article1" src={this.props.Cover} /></Link>
          <div className="w-70 text-center mx-10-auto" dangerouslySetInnerHTML={{__html:this.trimContent(this.props.Content)}}></div>
          <hr/>
      </div>
    )
  }
}

export default ArticlePartial;