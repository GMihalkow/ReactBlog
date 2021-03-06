import React, { Component } from 'react';
import IndexPage from '../pages/IndexPage';
import ArticlesPage from '../pages/articles/ArticlesPage';
import AboutPage from '../pages/AboutPage';
import ArticleDetailsPage from '../pages/articles/Details';
import { Route } from 'react-router-dom';

export default class Router extends Component {
    render() {
        return (
            <section>
                <Route exact path="/"  render={() => {
                return <IndexPage url={this.props.url} auth={this.props.auth}/>
                }} />
                <Route exact path="/articles" render={() => {
                    return <ArticlesPage url={this.props.url} auth={this.props.auth} />
                }}  />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/article/:id" component={ArticleDetailsPage} />
            </section>
        );
    }
}