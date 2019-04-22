import React, { Component } from 'react';
import Article from './articles/IndexPartial';
import LittelArticle from './articles/LatestArticle';
import { Animated } from "react-animated-css";
import FbPage from '../partials/FbRefference';

class IndexPage extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      window.FB.XFBML.parse(document.getElementById("fb-wrapper"));
    }, 500);
  }

  render() {
    return (
      <div id="main" className="three-to-one-grid w-70 mx-auto">
        <div className="m-20">
          {this.props.articles.slice(0, 3).map((el, index) => {
            if (index % 2 === 0) {
              return (
                <Animated animationIn="fadeInLeft" animationInDelay={1000} isVisible={true}>
                  <Article Id={el._id} Author={el.Author} Title={el.Title} Cover={el.Cover} Date={el.Date} Content={el.Content} />
                </Animated>);
            } else {
              return (
                <Animated animationIn="fadeInRight" animationInDelay={1000} isVisible={true}>
                  <Article Id={el._id} Author={el.Author} Title={el.Title} Cover={el.Cover} Date={el.Date} Content={el.Content} />
                </Animated>);
            }
          })}
        </div>
        <div className="text-center m-20 p-20">
          <div id="fb-wrapper">
          <Animated animationIn="fadeInRight" animationInDelay={1000} isVisible={true}>
            <FbPage />
          </Animated>
          </div>
          <Animated animationIn="fadeInRight" animationInDelay={1000} isVisible={true}>
            <div className="mt-50">
              <h2 className="bg-nav w-100 text-white mx-auto p-10">Популярни статии</h2>
              {this.props.articles.slice(0, 3).map((el, index) => {
                return <LittelArticle Id={el._id} Author={el.Author} Title={el.Title} Cover={el.Cover} Date={el.Date} Content={el.Content} />
              })}
            </div>
          </Animated>
        </div>
      </div>
    )
  }
}

export default IndexPage;