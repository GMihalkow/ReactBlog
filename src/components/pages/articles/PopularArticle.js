import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export class PopularArticle extends Component {

    constructor(props){
        super(props);
        
        let editedTitle = this.props.Title.replace(/[-?.!,]+/g, "").replace(/\s+/g, "-");

        this.state = {
            articleLink: "/article/" + this.props.Id + "&" + editedTitle
        }
    }
    
    trimContent(content){
        if(content.length < 11){
            return content + "...";
        } else {
            return content.substr(0, 11) + "...";
        }
    }
  
    render() {    
    return (
        <section className="mx-auto">
            <section className="two-to-four-grid mx-10-auto w-100">
                <section>
                    <Link to={this.state.articleLink}><img className="responsive-image" width="80" alt="article1" height="50" src={this.props.Cover} /></Link>
                </section>  
                <header className="text-start bold p-10">
                    <Link to={this.state.articleLink} className="text-black">{this.trimContent(this.props.Title)}</Link>
                </header>
            </section>
            <hr className="w-100" />
        </section>
    )
  }
}

export default PopularArticle;