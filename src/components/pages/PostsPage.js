import React, { Component } from 'react'

export class PostsPage extends Component {
  render() {
    return (
      <div id="main">
        <button onClick={this.props.test}>Test</button>
        {this.props.posts}
      </div>
    )
  }
}

export default PostsPage
