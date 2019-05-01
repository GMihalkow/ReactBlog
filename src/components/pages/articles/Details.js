import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookShareButton } from 'react-share';
import { FacebookShareCount } from 'react-share';
import { SocialIcon } from 'react-social-icons';
import { Animated } from 'react-animated-css';
import RequestModel from '../../RequestModel';

export class ArticleDetails extends RequestModel {
    _isMounted = false;

    constructor(props){
        super(props);
        
        this.state = {
            article: {}
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;

        this.get.apply(this, ["/articles", "/" + this.props.match.params.id, undefined, false, this._isMounted, "article"]);
    }
    
    render() {

        return (
            <article id="article" className="text-center mx-10-auto p-10 w-70">
                <Animated animationIn="fadeInRight" animationInDelay={1500} >
                    <h2 className="details-title mt-25">{this.state.article.Title}</h2>
                </Animated>
                <Animated animationIn="fadeIn" animationInDelay={1500}>
                    <p className="m-0"> <FontAwesomeIcon icon="calendar-alt" />: {this.state.article.Date} / <FontAwesomeIcon icon="eye" />: {this.state.article.views} </p>
                    <hr />
                </Animated>
                <Animated animationIn="fadeInLeft" animationInDelay={1500} >
                    <div className="mt-50">
                        <div className="details-content w-70 text-start mx-10-auto" dangerouslySetInnerHTML={{__html:this.state.article.Content}}>
                            
                        </div>
                    </div>
                </Animated>
                <Animated animationIn="fadeIn" animationInDelay={1500}>
                <p className="text-center mt-50">Автор: <span className="bold">{this.state.article.Author}</span> </p>
                    <hr className="mt-25"/>
                    <div className="text-center w-70 p-10 mx-auto">
                        <FacebookShareCount url="https://www.facebook.com">
                            {shareCount => (    
                                <div className="text-center">
                                    <FacebookShareButton className="display-inline m-10" url="https://www.facebook.com"><SocialIcon url="https://www.facebook.com/"/></FacebookShareButton>
                                    <p className="display-inline"> Споделания: {shareCount}</p>
                                </div>
                            )}
                        </FacebookShareCount>
                    </div>
                </Animated>
            </article>
        )
    }
}

export default ArticleDetails;