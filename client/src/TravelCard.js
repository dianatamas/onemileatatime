import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  card: {
    maxWidth: 345,
  },
  link: {
    color: 'inherit',
    textDecoration:'inherit',
  },
};

class TravelCard extends Component {

  render() {
    const { classes, travel } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={ travel.image }
            title={ travel.title }
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              { travel.title }
            </Typography>
            <Typography component="p">
              { travel.description }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={"/travels/" + travel._id} className={classes.link}>
            <Button size="small" color="primary">
              Explore
            </Button>
          </Link>
        </CardActions>
      </Card>

    )
  }
}

export default withStyles(styles)(TravelCard);
