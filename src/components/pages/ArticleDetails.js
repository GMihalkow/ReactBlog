import React, { Component } from 'react';
import axios from 'axios';
import { FacebookShareButton } from 'react-share';
import { FacebookShareCount } from 'react-share';
import { SocialIcon } from 'react-social-icons';
import { Animated } from "react-animated-css";

export class ArticleDetails extends Component {
    state = {
        article: {},
        result: ""
    }

    render() {
        axios.get("https://blog-583ce.firebaseio.com/Articles/" + this.props.match.params.id + ".json")
        .then((data) => {
            this.setState({ article: data.data });
        })
        .catch((error) => {
            
        });

        return (
            <div className="text-center mx-10-auto p-10 w-70">
                <Animated animationIn="fadeInRight" animationInDelay="1000" >
                    <h1 class="font-40 mt-25">{this.state.article.Title}</h1>
                </Animated>
                <Animated animationIn="fadeIn" animationInDelay="1000">
                    <p class="m-0">Автор: <span class="bold">Илиана Симеонова</span> / {this.state.article.Date} </p>
                    <hr />
                </Animated>
                <Animated animationIn="fadeInLeft" animationInDelay="1000" >
                    <div class="mt-50">
                        <div class="w-70 text-start mx-10-auto" dangerouslySetInnerHTML={{__html:this.state.article.Content}}>
                            
                        </div>
                    </div>
                </Animated>
                <Animated animationIn="fadeIn" animationInDelay="1000">
                    <hr />
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
            </div>
        )
    }
}

export default ArticleDetails;