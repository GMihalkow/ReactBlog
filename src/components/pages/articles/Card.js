import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ArticleCard extends Component {
  render() {
    return (
        <Card className="m-10 zoom-element article" variant="article" component="article">
            <CardActionArea>
                <CardMedia
                className="card-image"
                image={this.props.cover}
                title="Article cover"
                variant="article"
                component="article"/>
                <CardContent variant="section" component="section">
                    <Typography gutterBottom variant="header" component="header">
                        <h2 className="text-black font-16 m-0 p-10">{this.props.title}</h2>
                    </Typography>
                    <Typography className="m-0" gutterBottom variant="body1" component="p">
                        <FontAwesomeIcon icon="calendar-alt" /> {this.props.date}
                    </Typography>
                    <Typography className="m-0" gutterBottom variant="body1" component="p">
                        <FontAwesomeIcon icon="eye" /> {this.props.views}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
  }
}

export default ArticleCard;