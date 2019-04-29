import React, { Component } from 'react'
import { Animated } from "react-animated-css";

export class AboutPage extends Component {
  render() {
    return (
      <div id="about-section" className="w-70 p-20 mx-10-auto">
        <Animated animationIn="fadeInUp">
            <h2 id="about-me-heading" className="font-40 ml-5 w-70">За мен</h2>
            <hr/>
        </Animated>
        <div className="three-to-one-grid">
        <Animated animationIn="zoomIn">
            <div className="about-content text-start mt-25 p-10 font-16">
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
                <img className="br-5 cover-image" height="500" width="350" title="title" alt="coverImage" src="https://firebasestorage.googleapis.com/v0/b/blog-583ce.appspot.com/o/about.jpg?alt=media&token=5f782553-4fd2-4489-b0f3-922c8a2090f5"/>
            </div>
        </Animated>
        </div>
      </div>
    )
  }
}

export default AboutPage;