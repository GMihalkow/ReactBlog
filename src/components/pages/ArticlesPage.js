import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Article from './ArticlePartial';

export class ArticlesPage extends Component {
    render() {

        return (
            <div className="w-70 mx-10-auto text-center">
                <ul className="mt-25 nav">
                    <li className="display-inline"><a className="text-white bg-nav p-20 bold raise-nav-btn" href="/">2019</a></li>
                </ul>
                <div>
                </div>
            </div>
        )
    }
}

export default ArticlesPage;