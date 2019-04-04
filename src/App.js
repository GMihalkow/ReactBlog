import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Banner from './components/partials/Banner';
import RouterComponent from './components/partials/Router';
import Footer from './components/partials/Footer';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen  } from '@fortawesome/free-solid-svg-icons';

library.add(faBookOpen);

class App extends Component {
  state = {
    posts: [],
    articles: []
  }

  componentDidMount = () => {
    axios.get("https://blog-583ce.firebaseio.com/Articles.json")
      .then((d) => {
        this.setState({articles: [...Object.keys(d.data).map((key) => d.data[key])]});
      });
  }

  test = () => {
    axios.get("https://testapp-3b30c.firebaseio.com/messenger.json")
      .then((d) => {
        this.setState({posts: [...Object.keys(d.data)]});
      });
  }

  render() {

    return (
      <Router>
      <div className="App">
        <Banner/>
        <RouterComponent articles={this.state.articles} getArticles={this.getArticles} posts={this.state.posts} test={this.test}/>
        <Footer/> 
      </div>
      </Router>
    );
  }

}

export default App;