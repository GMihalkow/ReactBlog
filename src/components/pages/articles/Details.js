import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookShareButton } from 'react-share';
import { FacebookShareCount } from 'react-share';
import { SocialIcon } from 'react-social-icons';
import { Animated } from 'react-animated-css';
import PopularArticle from './PopularArticle';
import RequestModel from '../../RequestModel';
import { Link } from 'react-router-dom';


import FbPage from '../../partials/FbRefference';

export class ArticleDetails extends RequestModel {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            articleId: "",
            shareUrl: "",
            article: {},
            popularArticles: [],
            latestArticles: []
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidUpdate(){
        
        let index = this.props.match.params.id.lastIndexOf("-") + 1;
        let id = this.props.match.params.id.substr(index);
        if(id !== this.state.articleId){

            if(this._isMounted){
            
                this.setState({ articleId: id });
                this.setState({ shareUrl: "https://www.ilianablog.com/" + window.location.hash });
            }
    
            // Fetching the needed article
            this.get.apply(this, ["/articles", "/" + id, undefined, false, this._isMounted, "article"]);
    
        }
    }

    componentDidMount(){
        this._isMounted = true;

        let index = this.props.match.params.id.lastIndexOf("-") + 1;
        let id = this.props.match.params.id.substr(index);

        if(this._isMounted){
            
            this.setState({ articleId: id });
            this.setState({ shareUrl: "https://www.ilianablog.com/" + window.location.hash });
        }

        // Fetching the needed article
        this.get.apply(this, ["/articles", "/" + id, undefined, false, this._isMounted, "article"]);

        // Fetching the popular articles
        this.get.apply(this, ["/articles", '?sort={"views":-1}&limit=5', undefined, false, this._isMounted, "popularArticles"]);

        // Fetching the latest articles
        this.get.apply(this, ["/articles", '?sort={"entryId":-1}&limit=5', undefined, false, this._isMounted, "latestArticles"]);

        setTimeout(() => {
            window.FB.XFBML.parse(document.getElementById("fb-wrapper"));
        }, 500);
    }
    
    render() {

        return (
            <section itemScope id="main" className="three-to-one-grid w-70 mx-auto">
                <article id="article" itemProp="name" className="text-center mx-10-auto p-10 w-80">
                    <header>
                        <Animated animationIn="fadeInRight" animationInDelay={1500} >
                            <h2 className="details-title mt-25" itemProp="name">{this.state.article.Title}</h2>
                        </Animated>
                    </header>
                    <Animated animationIn="fadeIn" animationInDelay={1500}>
                        <p className="m-0"> <FontAwesomeIcon icon="calendar-alt" />: <time dateTime={this.state.article.Date}>{this.state.article.Date}</time> / <FontAwesomeIcon icon="eye" />: {this.state.article.views} </p>
                        <hr className="bg-nav" />
                    </Animated>
                    <Animated animationIn="fadeInLeft" animationInDelay={1500} >
                        <section className="mt-50 details-content w-100 text-start mx-10-auto" itemProp="articleBody" dangerouslySetInnerHTML={{__html:this.state.article.Content}}>
                            
                        </section>
                    </Animated>
                    <footer>
                        <Animated animationIn="fadeIn" animationInDelay={1500}>
                            <h3 className="text-center mt-50">Автор: <Link to="/about"><em>{this.state.article.Author}</em></Link> </h3>
                            <hr className="bg-nav mt-25"/>
                            <div className="text-center w-70 p-10 mx-auto">
                                <FacebookShareButton className="display-inline m-10" url={this.state.shareUrl}><SocialIcon url="https://www.facebook.com/"/></FacebookShareButton>
                                {/* <FacebookShareCount url="https://www.facebook.com"/> */}
                            </div>
                        </Animated>
                    </footer>
                </article>
                <aside className="text-center p-10">
                    <section id="fb-wrapper">
                        <FbPage />
                    </section>
                    <section id="popular-articles" className="mt-50">
                        <header>
                            <h2 className="bg-nav w-100 text-white mx-auto">Най-четени</h2>
                        </header>
                        {this.state.popularArticles.map((el, index) => {
                            return <PopularArticle Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Content={el.Content} />
                        })}
                    </section>
                    <section id="latest-articles" className="mt-50">
                        <header>
                            <h2 className="bg-nav w-100 text-white mx-auto">Най-нови</h2>
                        </header>
                        {this.state.latestArticles.map((el, index) => {
                            return <PopularArticle Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Content={el.Content} />
                        })}
                    </section>
                </aside>
            </section>
        )
    }
}

export default ArticleDetails;