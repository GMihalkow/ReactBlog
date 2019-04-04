import React, { Component } from 'react';
import Article from './ArticlePartial';
import LittelArticle from './LatestArticlePartial';
import { Animated } from "react-animated-css";
import FbPage from '../partials/FbRefference';

class IndexPage extends Component {
  componentDidMount = () => {
    window.FB.XFBML.parse(document.getElementById("fb-wrapper"));
  }

  render() {
    return (
      <div id="main" className="three-to-one-grid w-70 mx-auto">
        <div>
          {this.props.articles.slice(0, 3).map((el, index) => {
            if (index % 2 === 0) {
              return (
                <Animated animationIn="fadeInLeft" animationInDelay={1000} isVisible={true}>
                  <Article Id={el.Id} Title={el.Title} Cover={el.Cover} Date={el.Date} Content={el.Content} />
                </Animated>);
            } else {
              return (
                <Animated animationIn="fadeInRight" animationInDelay={1000} isVisible={true}>
                  <Article Id={el.Id} Title={el.Title} Cover={el.Cover} Date={el.Date} Content={el.Content} />
                </Animated>);
            }
          })}
        </div>
        <div className="text-center mt-50">
          <div id="fb-wrapper">
          <Animated animationIn="fadeInRight" animationInDelay={1000} isVisible={true}>
            <FbPage />
          </Animated>
          </div>
          <Animated animationIn="fadeInRight" animationInDelay={1000} isVisible={true}>
            <div className="mt-50 p-20">
              <h2 className="bg-nav w-70 text-white mx-auto p-10">Популярни статии</h2>
              {this.props.articles.slice(0, 3).map((el, index) => {
                return <LittelArticle Id={el.Id} Title={el.Title} Cover={el.Cover} Date={el.Date} Content={el.Content} />
              })}
            </div>
          </Animated>
        </div>
      </div>
    )
  }
}

export default IndexPage;