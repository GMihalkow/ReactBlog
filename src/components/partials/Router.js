import React, { Component } from 'react';
import IndexPage from '../pages/IndexPage';
import PostsPage from '../pages/PostsPage';
import ArticlesPage from '../pages/articles/ArticlesPage';
import AboutPage from '../pages/AboutPage';
import ArticleDetailsPage from '../pages/articles/Details';
import { Route } from 'react-router-dom';

export default class Router extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <IndexPage articles={this.props.articles} />
                )} />
                <Route exact path="/posts" render={() => (
                    <PostsPage posts={this.props.posts} test={this.props.test} />
                )} />
                <Route exact path="/articles" render={() => (
                    <ArticlesPage articles={this.props.articles} />
                )} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/article/:id" component={ArticleDetailsPage} />
            </div>
        );
    }
}