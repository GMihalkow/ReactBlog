import React, { Component } from 'react'
import { Link } from '../../../node_modules/react-router-dom';

export class Pagging extends Component {
    state = {
        url: "https://baas.kinvey.com/appdata/kid_HkMAqLj9N/articles",
        countArr: []
    };

    componentDidMount(){
      // Getting the total articles count
      fetch(this.state.url + "/_count", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
        }
      }).then((data) => {
        return data.json();
      }).then((data) => {
        if(data.count < 12){
          this.state.countArr.push(1);
        } else {
          for (let index = 0; index < Math.round(data.count / 12); index++) {
            this.state.countArr.push(index + 1);
          }
        }
      });
    }

  render() {
    return (
      <div>
        <ol className="mt-25">
          {Array.from(this.state.countArr).map((el) => {
            return (<Link key={el} to="/"><li className="text-black display-inline p-10 custom-select font-16 m-10">{el}</li></Link>);
          })}
        </ol>
      </div>
    )
  }
}

export default Pagging;
