import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Rating from 'react-rating'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoCardEdit from './InfoCardEdit'

const styles = {
  card: {
    width: 345,
    height: 300
  },
  content: {
    height: 150
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}

class InfoCard extends React.Component {

  state = {
    showEditPane: false,
  }

  // Switch to Edit mode
  showEditPane = () => {
    this.setState({ showEditPane: true })
  }

  // Switch to Read-only mode
  closeEditPane = () => {
    this.setState({ showEditPane: false })
  }

  render () {
    const { classes, place } = this.props
    const { showEditPane } = this.state

    return (
      <div>
        <Card className={classes.card}>
            {showEditPane ?
              <InfoCardEdit
                place={ place }
                updatePlace={ this.props.updatePlace }
              />
              :
              <Fragment>
                <CardHeader title={place.name} />
                <CardContent className={classes.content}>
                  <Rating
                    fractions={ 2 }
                    initialRating={ place.rating }
                    emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
                    fullSymbol={<Star style={{ color: '#1976d2' }}/>}
                    readonly
                  />
                  <Typography gutterBottom>
                    {place.comment}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={ this.showEditPane }
                    color="secondary"
                    aria-label="Edit Place"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="Delete Place"
                    onClick={ () => this.props.deletePlace(place._id) }
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Fragment>
            }
        </Card>
      </div>
    )
  }

}


export default withStyles(styles)(InfoCard);
