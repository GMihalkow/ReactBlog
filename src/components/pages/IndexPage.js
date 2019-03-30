import React, { Component } from 'react';
import Article from './ArticlePartial';
import LittelArticle from './LatestArticlePartial';
import FB from '../partials/FbRefference';
import { Animated } from "react-animated-css";

export class IndexPage extends Component {
  render() {
    this.props.getArticles.apply(this)

    return (
        <div id="main" className="three-to-one-grid w-70 mx-auto">
          <div>
            {this.props.articles.map((el, index) =>{
              if(index % 2 === 0){

                return (
                <Animated animationIn="fadeInLeft" isVisible={true}>
                  <Article Title={el.Title} Date={el.Date} Content={el.Content} />
                </Animated>);
              } else {
                return (
                <Animated animationIn="fadeInRight" isVisible={true}>
                  <Article Title={el.Title} Date={el.Date} Content={el.Content} />
                </Animated>);
              }
            })}
          </div>
          <div className="text-center mt-25">
            <FB/>
            <Animated animationInDelay="1000" animationIn="fadeInRight" isVisible={true}>
            <div className="mt-25">
              <h2 className="bg-nav w-70 text-white mx-auto p-10">Популярни статии</h2> 
              <LittelArticle/>
              <LittelArticle/>
              <LittelArticle/>
              <LittelArticle/> 
            </div>
          </Animated>
          </div>
        </div>
    )
  }
}

export default IndexPage;