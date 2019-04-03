import React, { Component } from 'react'
import { Animated } from "react-animated-css";

export class AboutPage extends Component {
  render() {
    return (
      <div className="w-70 p-20 mx-10-auto">
        <Animated animationIn="fadeInUp">
            <h1 className="font-40 ml-5 w-70">За мен</h1>
            <hr/>
        </Animated>
        <div className="three-to-one-grid p-10 m-20">
        <Animated animationIn="zoomIn">
            <div className="text-start mt-25 p-10">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </Animated>
        <Animated animationIn="zoomIn">
            <div className="mt-25 p-10">
                <img height="500" width="500" title="title" alt="coverImage" src="https://firebasestorage.googleapis.com/v0/b/blog-583ce.appspot.com/o/test.jpg?alt=media&token=d5d45cac-2245-482f-925d-f485d8ca45bc"/>
            </div>
        </Animated>
        </div>
      </div>
    )
  }
}

export default AboutPage;