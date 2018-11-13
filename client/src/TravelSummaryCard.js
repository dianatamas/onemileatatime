import React, { Component, Fragment } from 'react'
import Rating from 'react-rating'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TravelSummaryCardEdit from './TravelSummaryCardEdit'
import BudgetBar from './BudgetBar'
import Divider from '@material-ui/core/Divider'

const styles = {
  tagDone: {
    padding: '5px 8px 5px 8px',
    backgroundColor: '#34a83499',
    maxWidth: 'min-content',
  },
  budgetBar: {
    height: 20,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  divider: {
    marginTop: 20,
    marginBottom: 20
  },
  media: {
    height: 200,
  },
}

const statuses = {
  0: 'Planned',
  1: 'Done'
}

class TravelSummaryCard extends Component {

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
    const { classes, travel } = this.props
    const { showEditPane } = this.state

    return (
      <Fragment>
        <Card style={{ height: '100%' }} elevation={ 0 } square>
          {!showEditPane &&
            <CardMedia
              className={classes.media}
              image={ travel.image }
            />
          }
          <CardContent>
            {showEditPane &&
              <TravelSummaryCardEdit
                travel={ this.props.travel }
                updateTravel={ this.props.updateTravel }
                closeEditPane={ this.closeEditPane }
              />
            }
            {!showEditPane &&
              <Fragment>
                <Grid container alignItems={ 'center' } style={{ marginBottom:20 }}>

                  <Grid item>
                    <Typography variant='headline' style={{ fontWeight: 500, marginRight: 10 }} >
                      { travel.title.toUpperCase() }
                    </Typography>

                  </Grid>
                  <Grid item style={{flexGrow: 1}}>
                    <div className={ classes.tagDone }>
                      <Typography variant='button' style={{ color: 'white', fontWeight: 500 }}>
                        { statuses[travel.status] }
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={ this.showEditPane }
                      color="secondary"
                      aria-label="Edit Travel"
                    >
                      <EditIcon fontSize='small'/>
                    </IconButton>
                    <IconButton
                      onClick={ () => this.props.deleteTravel(travel._id) }
                      color="secondary"
                      aria-label="Delete Travel"
                    >
                      <DeleteIcon fontSize='small'/>
                    </IconButton>
                  </Grid>
                </Grid>
                <Typography gutterBottom>{ travel.description }</Typography>
                <Divider className={ classes.divider }/>
                <Typography variant='subheading' gutterBottom>Rating</Typography>
                <Rating
                  fractions={ 2 }
                  initialRating={ travel.rating }
                  emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
                  fullSymbol={<Star style={{ color: '#1976d2' }}/>}
                  readonly
                />
                <Divider className={ classes.divider }/>
                <Typography variant='subheading' gutterBottom>Dates</Typography>
                <span>{ new Date(travel.startDate).toLocaleDateString() + ' - ' +
                new Date(travel.endDate).toLocaleDateString()}</span>
                <Divider className={ classes.divider }/>
                <Typography variant='subheading'>Budget</Typography>
                <BudgetBar
                  housingBudget={ travel.housingBudget }
                  transportBudget={ travel.transportBudget }
                  otherBudget={ travel.otherBudget }
                />
              </Fragment>
            }
          </CardContent>
        </Card>
      </Fragment>
    )
  }
}

export default withStyles(styles)(TravelSummaryCard)
