import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export class ArticleCard extends Component {
  render() {
    return (
        <Card className="m-10 zoom-element article">
            <CardActionArea>
                <CardMedia
                className="card-image"
                image={this.props.cover}
                title="Article cover"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        {this.props.title}
                    </Typography>
                    <Typography className="m-0" gutterBottom variant="body1" component="p">
                        Дата: {this.props.date}
                    </Typography>
                    <Typography className="m-0" gutterBottom variant="body1" component="p">
                        Преглеждания: {this.props.views}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Научи повече
                </Button>
            </CardActions>
        </Card>
    )
  }
}

export default ArticleCard;