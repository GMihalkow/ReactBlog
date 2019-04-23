import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Banner from './components/partials/Banner';
import RouterComponent from './components/partials/Router';
import Footer from './components/partials/Footer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen  } from '@fortawesome/free-solid-svg-icons';

library.add(faBookOpen);

class App extends Component {
  state = {
    articles: [],
    url: "https://baas.kinvey.com/appdata/kid_HkMAqLj9N/articles"
  }

  componentDidMount = () => {
    fetch(this.state.url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
      }
    }).then((data) => {
      return data.json();
    }).then((articles) => {
      this.setState({articles: articles});
    });
  }

  render() {

    return (
      <Router>
      <div className="App">
        <Banner/>
        <RouterComponent articles={this.state.articles} url={this.state.url} getArticles={this.getArticles}/>
        <Footer/> 
      </div>
      </Router>
    );
  }

}

export default App;