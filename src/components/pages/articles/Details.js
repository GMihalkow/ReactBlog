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
            articleId: "",
            shareUrl: "",
            article: { }
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        // debugger;

        let id = this.props.match.params.id.split("&")[0];

        if(this._isMounted){
            
            
            this.setState({ articleId: id });
            this.setState({ shareUrl: "https://www.ilianablog.com/" + window.location.hash });
        }

        this.get.apply(this, ["/articles", "/" + id, undefined, false, this._isMounted, "article"]);
    }
    
    render() {

        return (
            <article id="article" className="text-center mx-10-auto p-10 w-70">
                <header>
                    <Animated animationIn="fadeInRight" animationInDelay={1500} >
                        <h2 className="details-title mt-25">{this.state.article.Title}</h2>
                    </Animated>
                </header>
                <Animated animationIn="fadeIn" animationInDelay={1500}>
                    <p className="m-0"> <FontAwesomeIcon icon="calendar-alt" />: {this.state.article.Date} / <FontAwesomeIcon icon="eye" />: {this.state.article.views} </p>
                    <hr />
                </Animated>
                <Animated animationIn="fadeInLeft" animationInDelay={1500} >
                    <section className="mt-50 details-content w-70 text-start mx-10-auto" dangerouslySetInnerHTML={{__html:this.state.article.Content}}>
                        
                    </section>
                </Animated>
                <footer>
                    <Animated animationIn="fadeIn" animationInDelay={1500}>
                        <p className="text-center mt-50">Автор: {this.state.article.Author} </p>
                        <hr className="mt-25"/>
                        <section className="text-center w-70 p-10 mx-auto">
                        <FacebookShareButton className="display-inline m-10" url={this.state.shareUrl}><SocialIcon url="https://www.facebook.com/"/></FacebookShareButton>
                        {/* <FacebookShareCount url="https://www.facebook.com"/> */}
                        </section>
                    </Animated>
                </footer>
            </article>
        )
    }
}

export default ArticleDetails;