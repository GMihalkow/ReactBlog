import React, { Component } from 'react';
import { FacebookShareButton } from 'react-share';
import { FacebookShareCount } from 'react-share';
import { SocialIcon } from 'react-social-icons';
import { Animated } from "react-animated-css";
import { config } from '@fortawesome/fontawesome-svg-core';

export class ArticleDetails extends Component {
    state = {
        article: {},
        result: ""
    }

    componentDidMount(){
        let url = "https://baas.kinvey.com/appdata/kid_HkMAqLj9N/articles/" + this.props.match.params.id;

        fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
            }
            }).then((data) => {
                return data.json();
            }).then((article) => {
                article.views++;
                fetch(url, {
                    method: "PUT", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
                    },
                    body: JSON.stringify(article)
                    }).then(() => {
                    this.setState({article: article});
                });
            });
    }
    
    render() {

        return (
            <article id="article" className="text-center mx-10-auto p-10 w-70">
                <Animated animationIn="fadeInRight" animationInDelay={1500} >
                    <h1 className="font-40 mt-25">{this.state.article.Title}</h1>
                </Animated>
                <Animated animationIn="fadeIn" animationInDelay={1500}>
                    <p className="m-0">Автор: <span className="bold">{this.state.article.Author}</span> / Дата: {this.state.article.Date} / Преглеждания: {this.state.article.views} </p>
                    <hr />
                </Animated>
                <Animated animationIn="fadeInLeft" animationInDelay={1500} >
                    <div className="mt-50">
                        <div className="w-70 text-start mx-10-auto" dangerouslySetInnerHTML={{__html:this.state.article.Content}}>
                            
                        </div>
                    </div>
                </Animated>
                <Animated animationIn="fadeIn" animationInDelay={1500}>
                    <hr className="mt-50"/>
                    <div className="text-start w-30 mx-auto">
                        <FacebookShareCount url="https://www.facebook.com">
                            {shareCount => (    
                                <React.Fragment >
                                    <center>
                                        <FacebookShareButton width="20px"  url="https://www.facebook.com"><SocialIcon url="https://www.facebook.com/"/></FacebookShareButton>
                                        <p>{shareCount}</p>
                                    </center>
                                </React.Fragment>
                            )}
                        </FacebookShareCount>
                    </div>
                </Animated>
            </article>
        )
    }
}

export default ArticleDetails;