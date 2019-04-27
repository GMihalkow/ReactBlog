import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export class LatestArticlePartial extends Component {
    trimContent(content){
        if(content.length < 7){
            return content + "...";
        } else {
            return content.substr(0, 7) + "...";
        }
    }
  
    render() {    
    const articleLink = "/article/" + this.props.Id;

    return (
        <div className="mx-auto">
            <div className="two-to-four-grid mx-10-auto w-100">
                <div>
                    <Link to={articleLink}><img className="responsive-image" width="80" alt="article1" height="50" src={this.props.Cover} /></Link>
                </div>  
                <div className="text-start bold p-10">
                    <Link to={articleLink} className="text-black">{this.trimContent(this.props.Title)}</Link>
                </div>
            </div>
            <hr className="w-100" />
        </div>
    )
  }
}

export default LatestArticlePartial;
