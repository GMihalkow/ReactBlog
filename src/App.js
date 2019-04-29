import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Banner from './components/partials/Banner';
import RouterComponent from './components/partials/Router';
import Footer from './components/partials/Footer';
import Loading from './components/partials/Loading';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen, faTimesCircle, faBars, faEye, faCalendarAlt, faShareAlt, faChevronCircleDown  } from '@fortawesome/free-solid-svg-icons';

library.add(faBookOpen);
library.add(faTimesCircle);
library.add(faChevronCircleDown);
library.add(faShareAlt);
library.add(faCalendarAlt);
library.add(faEye);
library.add(faBars);

class App extends Component {
  state = {
    url: process.env.REACT_APP_KINVEY_BASE_URL + process.env.REACT_APP_KINVEY_APP_KEY,
    auth: process.env.REACT_APP_KINVEY_APP_AUTHORIZATION
  }

  componentDidMount = () => {
    var _oldFetch = fetch; 

    window.fetch = function(){

      // Create hooks
      var fetchStart = new Event( 'fetchStart', { 'view': document, 'bubbles': true, 'cancelable': false } );
      var fetchEnd = new Event( 'fetchEnd', { 'view': document, 'bubbles': true, 'cancelable': false } );

      // Pass the supplied arguments to the real fetch function
      var fetchCall = _oldFetch.apply(this, arguments);

      // Trigger the fetchStart event
      document.dispatchEvent(fetchStart);

      fetchCall.then(function(){
          // Trigger the fetchEnd event
          document.dispatchEvent(fetchEnd);
      }).catch(function(){
          // Trigger the fetchEnd event
          document.dispatchEvent(fetchEnd);
      });

      return fetchCall;
    };

    document.addEventListener('fetchStart', function() {
      let loader = document.querySelector("#loader");
      if(loader){
        loader.style.display = "block";
      }
    });

    document.addEventListener('fetchEnd', function() {
      let loader = document.querySelector("#loader");
      if(loader){
        loader.style.display = "none";
      }
    });
  }

  render() {

    return (
      <Router>
      <div className="App">
        <Banner/>
        <Footer/> 
        <RouterComponent url={this.state.url} auth={this.state.auth}/>
        <Loading />
      </div>
      </Router>
    );
  }

}

export default App;