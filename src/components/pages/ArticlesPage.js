import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './ArticleCard';
import { Animated } from "react-animated-css";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


export class ArticlesPage extends Component {

    render() {
        return (
            <div className="w-70 mx-10-auto text-center">
              <Animated animationIn="fadeIn" animationInDelay="500">
                <div className="four-fragments-grid mt-50">
                  <Link to="/articles/1"><Card name="test" /></Link>
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  </div>
              </Animated>
                {/* <ul className="mt-25 nav"> */}
                    {/* <a className="text-white bg-nav p-20 m-20 bold raise-nav-btn text-center" href="/">2019</a> */}
                {/* </ul> */}
            </div>
        )
    }
}

export default ArticlesPage;