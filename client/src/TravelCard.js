import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom"
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import DeleteTravelConfirmation from './DeleteTravelConfirmation'

const styles = {
  card: {
    width: 250,
  },
  link: {
    color: 'inherit',
    textDecoration:'inherit',
  },
}

class TravelCard extends Component {

  state = {
    openConfirmation: false
  }

  openConfirmation = () => {
    this.setState({ openConfirmation: true })
  }

  closeConfirmation = () => {
    this.setState({ openConfirmation: false })
  }

  onConfirmation = () => {
    this.props.deleteTravel(this.props.travel._id)
  }

  render() {
    const { classes, travel } = this.props

    return (
      <Fragment>
      <Card className={ classes.card }>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={ travel.image }
            title={ travel.title }
          />
          <CardContent style={{ height: 40 }}>
            <Typography gutterBottom variant="headline">
              { travel.title }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={ "/travels/" + travel._id } className={ classes.link }>
            <Button size="small" color="primary">
              Explore
            </Button>
          </Link>
          <Button size="small" color="primary" onClick={ this.openConfirmation }>
            Delete
          </Button>
        </CardActions>
      </Card>
      <DeleteTravelConfirmation
        open={ this.state.openConfirmation }
        onClose={ this.closeConfirmation }
        onConfirmation={ this.onConfirmation }
        title={ travel.title }
      />
      </Fragment>
    )
  }
}

export default withStyles(styles)(TravelCard)
