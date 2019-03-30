import React, {Component} from 'react';
import IndexPage from '../pages/IndexPage';
import PostsPage from '../pages/PostsPage';
import CreateArticle from '../pages/CreateArticle';
import {Route} from 'react-router-dom';

export default class Router extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={IndexPage}/>
                <Route exact path="/articles/create" component={CreateArticle}/>
                <Route exact path="/posts" render={() => (
                    <PostsPage posts={this.props.posts} test={this.props.test} />
                )} />
            </div>
        );
    }
}