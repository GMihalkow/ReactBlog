import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export class PopularArticle extends Component {

    constructor(props){
        super(props);
        
        let editedTitle = this.props.Title.replace(/[-?.!,]+/g, "").replace(/\s+/g, "-");
        let titleParts = editedTitle.split("-");
        
        if(titleParts.length > 3){
            editedTitle = titleParts.slice(0, 3).join("-");
        }

        editedTitle = "Лайфстайл-" + editedTitle;

        this.state = {
            articleLink: "/article/" + editedTitle + "-" + this.props.Id
        }
    }
    
    trimContent(content){
        if(content.length < 11){
            return content + "...";
        } else {
            return content.substr(0, 11) + "...";
        }
    }

    scrollToTop() {
        window.scrollTo(0,0);
    }
  
    render() {    
    return (
        <section className="mx-auto">
            <section className="two-to-four-grid mx-10-auto w-100">
                <section>
                    <Link onClick={this.scrollToTop.bind(this)} to={this.state.articleLink}><img className="responsive-image" width="80" alt="Лайфстайл" height="50" src={this.props.Cover} /></Link>
                </section>  
                <header className="text-start bold p-10">
                    <Link onClick={this.scrollToTop.bind(this)} to={this.state.articleLink} className="text-black">{this.trimContent(this.props.Title)}</Link>
                </header>
            </section>
            <hr className="w-100" />
        </section>
    )
  }
}

export default PopularArticle;
