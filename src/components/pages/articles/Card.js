import React, { Component } from 'react';
import '../css/card.css';

export class ArticleCard extends Component {
  render() {
    return (
        <section className="blog-card article zoom-element">
            <img className="blog-card-cover" alt={this.props.title} src={this.props.cover}/>
            <section className="blog-card-description">
                <div className="blog-card-title">
                    <b>{this.props.title}</b>
                </div>
                <div className="float-left blog-card-date">
                    {this.props.date}
                </div>
            </section>
        </section>
        // <Card className="m-10 zoom-and-show-shadow-effect article" variant="article" component="article">
        //     <CardActionArea>
        //         <CardMedia
        //             className="card-image"
        //             image={this.props.cover}
        //             title="Article cover"
        //             variant="img"
        //             alt="Лайфстайл"
        //             component="img"/>
        //         <CardContent variant="section" component="section">
        //             <Typography gutterBottom variant="headline" component="header">
        //                 <h2 className="text-black font-16 m-0">{this.props.title}</h2>
        //             </Typography>
        //         </CardContent>
        //     </CardActionArea>
        // </Card>
    )
  }
}

export default ArticleCard;