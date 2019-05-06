import React from 'react';
import Article from './articles/IndexPartial';
import PopularArticle from './articles/PopularArticle';
import { Animated } from 'react-animated-css';
import FbPage from '../partials/FbRefference';
import RequestModel from '../RequestModel';

class IndexPage extends RequestModel {
  _isMounted = false;

  constructor(props){
    super(props);

    this.state = {
      url: this.props.url + "/articles",
      articles: [],
      latestArticles: [],
      popularArticles: [] 
    }    
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  componentDidMount = () => {
    this._isMounted = true;

    // Fetching the latest articles
    this.get.apply(this, ["/articles", '?sort={"entryId":-1}&limit=3', undefined, false, this._isMounted, "articles"]);

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
      <section id="main" className="three-to-one-grid w-70 mx-auto">
        <section className="m-20">
          {this.state.articles.slice(0, 3).map((el, index) => {
            if (index % 2 === 0) {
              return (
                <Animated key={index} animationIn="fadeInLeft" isVisible={true}>
                  <Article  Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Content={el.Content} />
                </Animated>);
            } else {
              return (
                <Animated key={index} animationIn="fadeInRight" isVisible={true}>
                  <Article Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Content={el.Content} />
                </Animated>);
            }
          })}
        </section>
        <aside className="text-center mt-25 p-10">
          <section id="fb-wrapper">
          <Animated animationIn="fadeInRight" isVisible={true}>
            <FbPage />
          </Animated>
          </section>
          <Animated animationIn="fadeInRight" isVisible={true}>
            <section id="popular-articles" className="mt-50">
              <h2 className="bg-nav w-100 text-white mx-auto">Най-четени</h2>
              {this.state.popularArticles.map((el, index) => {
                return <PopularArticle Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Content={el.Content} />
              })}
            </section>
            <section id="latest-articles" className="mt-50">
              <h2 className="bg-nav w-100 text-white mx-auto">Най-нови</h2>
              {this.state.latestArticles.map((el, index) => {
                  return <PopularArticle Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Content={el.Content} />
              })}
            </section>
          </Animated>
        </aside>
      </section>
    )
  }
}

export default IndexPage;