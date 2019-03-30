import React, { Component } from 'react';
import Article from './ArticlePartial';
import LittelArticle from './LatestArticlePartial';
import FB from '../partials/FbRefference';

export class IndexPage extends Component {
  render() {
    return (
        <div id="main" className="three-to-one-grid w-70 mx-auto">
          <div><Article/></div>
          <div className="text-center mt-25">
            <FB/>
            <div className="mt-25">
              <h2 className="bg-nav w-70 text-white mx-auto p-10">Последни статии</h2> 
              <LittelArticle/>
              <LittelArticle/>
              <LittelArticle/>
              <LittelArticle/> 
            </div>
          </div>
        </div>
    )
  }
}

export default IndexPage;