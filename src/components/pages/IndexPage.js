import React, { Component } from 'react';
import Article from './articles/IndexPartial';
import LittelArticle from './articles/LatestArticle';
import { Animated } from "react-animated-css";
import FbPage from '../partials/FbRefference';

class IndexPage extends Component {
  state = {
    url: "https://baas.kinvey.com/appdata/kid_HkMAqLj9N/articles",
    articles: [],
    popularArticles:[],
  }

  componentDidMount = () => {
    fetch(encodeURI(this.state.url + '?sort={"entryId":-1}&limit=3'), {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
      }
    }).then((data) => {
      return data.json();
    }).then((articles) => {
      this.setState({articles: articles});
    });


    fetch(encodeURI(this.state.url + '?sort={"views":-1}&limit=3'), {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
      }
    }).then((data) => {
      return data.json();
    }).then((articles) => {
      this.setState({popularArticles: articles});
    });

    setTimeout(() => {
      window.FB.XFBML.parse(document.getElementById("fb-wrapper"));
    }, 500);
  }

  render() {
    return (
      <div id="main" className="three-to-one-grid w-70 mx-auto">
        <div className="m-20">
          {this.state.articles.slice(0, 3).map((el, index) => {
            if (index % 2 === 0) {
              return (
                <Animated key={index} animationIn="fadeInLeft" isVisible={true}>
                  <Article Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Date={el.Date} Content={el.Content} />
                </Animated>);
            } else {
              return (
                <Animated key={index} animationIn="fadeInRight" isVisible={true}>
                  <Article Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Date={el.Date} Content={el.Content} />
                </Animated>);
            }
          })}
        </div>
        <div className="text-center mt-25 p-10">
          <div id="fb-wrapper">
          <Animated animationIn="fadeInRight" isVisible={true}>
            <FbPage />
          </Animated>
          </div>
          <Animated animationIn="fadeInRight" isVisible={true}>
            <div className="mt-50">
              <h2 className="bg-nav w-100 text-white mx-auto">Популярни статии</h2>
              {this.state.popularArticles.map((el, index) => {
                return <LittelArticle Id={el._id} key={index} Author={el.Author} Title={el.Title} Cover={el.Cover} Content={el.Content} />
              })}
            </div>
          </Animated>
        </div>
      </div>
    )
  }
}

export default IndexPage;