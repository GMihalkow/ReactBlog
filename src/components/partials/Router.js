import React, {Component} from 'react';
import IndexPage from '../pages/IndexPage';
import PostsPage from '../pages/PostsPage';
import ArticlesPage from '../pages/ArticlesPage';
import ArticleDetails from '../pages/ArticleDetails';
import {Route} from 'react-router-dom';

export default class Router extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <IndexPage articles={this.props.articles} getArticles={this.props.getArticles} />
                )}/>
                <Route exact path="/posts" render={() => (
                    <PostsPage posts={this.props.posts} test={this.props.test} />
                )} />
                <Route exact path="/articles" component={ArticlesPage}/>
                <Route exact path="/articles/:id" component={ArticleDetails}/>
            </div>
        );
    }
}