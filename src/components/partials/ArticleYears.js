import React, { Component } from 'react';
import ArticlesPage from '../pages/articles/ArticlesPage';
import '../pages/css/article.css';

export class ArticleYears extends Component {
    render() {
        return (
            <section id="articles-categories" className="articles-categories mt-25">
              <h2 className="p-10">Години на издаване</h2>
              <hr className="w-70 mx-auto" />
              <div>
                { /* TODO [GM]: Add forEach that prints all years */ }
                <label className="checkbox-container">
                  <input value=".*" type="checkbox"/>
                  <span className="checkmark"></span>
                  <span className="checkmark-label">Всички</span>
                </label>
                <label className="checkbox-container">
                  <input value="2019" type="checkbox"/>
                  <span className="checkmark"></span>
                  <span className="checkmark-label">2019</span>
                </label>
              </div>
            </section>
        )
    }
}

export default ArticleYears;