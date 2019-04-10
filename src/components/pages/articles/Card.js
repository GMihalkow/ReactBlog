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
        <Card className="m-10 zoom-element">
            <CardActionArea>
                <CardMedia
                className="card-image"
                image="https://firebasestorage.googleapis.com/v0/b/blog-583ce.appspot.com/o/test.png?alt=media&token=16f010ff-4596-4e84-a154-13f6b95781cc"
                title="Article cover"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        {this.props.title}
                    </Typography>
                    <Typography gutterBottom variant="p" component="p">
                        {this.props.date}
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