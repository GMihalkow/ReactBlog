import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export class LatestArticlePartial extends Component {
    trimContent(content){
        if(content.length < 20){
            return content + "...";
        } else {
            return content.substr(0, 20) + "...";
        }
    }
  
    render() {    
    const articleLink = "/article/" + this.props.Id;

    return (
        <div>
            <div className="two-to-four-grid mx-10-auto">
                <div>
                    <Link to={articleLink}><img className="article-image responsive-image" width="100" alt="article1" height="50" src={this.props.Cover} /></Link>
                </div>  
                <div className="text-start bold p-10">
                    <Link to={articleLink} className="text-black">{this.trimContent(this.props.Title)}</Link>
                </div>
            </div>
            <p className="text-end mx-auto font-14">{this.props.Date}</p>
            <hr className="w-100" />
        </div>
    )
  }
}

export default LatestArticlePartial;
