import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ArticlesPage extends Component {
    render() {

        return (
            <div className="w-70 three-to-one-grid mx-10-auto text-center">
                <div>
                
                </div>
                <div>
                <ul className="mt-25 nav">
                    <a className="text-white bold" href="/"><li className=" bg-nav p-10">Начало</li></a>
                    <Link className="text-white bold" to="/articles"><li className=" bg-nav p-10">Статии</li></Link>
                    <Link className="text-white bold" to="/posts"><li className=" bg-nav p-10">За мен</li></Link>
                </ul>
                </div>
            </div>
        )
    }
}

export default ArticlesPage;