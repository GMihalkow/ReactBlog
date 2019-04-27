import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Banner from './components/partials/Banner';
import RouterComponent from './components/partials/Router';
import Footer from './components/partials/Footer';
import Loading from './components/partials/Loading';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen  } from '@fortawesome/free-solid-svg-icons';
import { faBars  } from '@fortawesome/free-solid-svg-icons';

library.add(faBookOpen);
library.add(faBars);

class App extends Component {
  state = {
    url: "https://baas.kinvey.com/appdata/kid_HkMAqLj9N/articles"
  }

  componentDidMount = () => {
    // document.onload = function(){
    // Store a copy of the fetch function
    var _oldFetch = fetch; 

      // Create our new version of the fetch function
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
          document.querySelector("#loader").style.display = "block";
      });

      document.addEventListener('fetchEnd', function() {
        document.querySelector("#loader").style.display = "none";        
      });
    // }

  }

  render() {

    return (
      <Router>
      <div className="App">
        <Banner/>
        <Footer/> 
        <RouterComponent url={this.state.url}/>
        <Loading />
      </div>
      </Router>
    );
  }

}

export default App;