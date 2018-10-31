import React, { Component, Fragment } from 'react'
import Rating from 'react-rating'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TravelSummaryCardEdit from './TravelSummaryCardEdit'
import BudgetBar from './BudgetBar'

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
}

class TravelSummaryCard extends Component {

  state = {
    activeStep: 0,
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

  // Show next picture
  handleNext = () => {
   this.setState(prevState => ({
     activeStep: prevState.activeStep + 1,
   }))
 }

 // Show previous picture
 handleBack = () => {
   this.setState(prevState => ({
     activeStep: prevState.activeStep - 1,
   }))
 }

  render () {
    const { classes, travel } = this.props
    const { activeStep, showEditPane } = this.state
    const maxSteps = 1

    return (
      <Fragment>
        <Card style={{ marginTop: 5 }}>
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
                    <Button
                      onClick={ this.showEditPane }
                      variant="fab"
                      color="secondary"
                      aria-label="Edit Travel"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={ () => this.props.deleteTravel(travel._id) }
                      variant="fab"
                      color="secondary"
                      aria-label="Delete Travel"
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                  <Grid item>
                    <div className={ classes.tagDone }>
                      <Typography variant='button' style={{ color: 'white', fontWeight: 500 }}>
                        { travel.status }
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Rating
                  fractions={ 2 }
                  initialRating={ travel.rating }
                  emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
                  fullSymbol={<Star style={{ color: '#1976d2' }}/>}
                />
                <Typography gutterBottom>{ travel.description }</Typography>
                <Typography variant='subheading'>Budget</Typography>
                <BudgetBar
                  housingBudget={ travel.housingBudget }
                  transportBudget={ travel.transportBudget }
                  otherBudget={ travel.otherBudget }
                />
                <img
                  className={ classes.img }
                  alt=''
                  src={ travel.image }
                />
                <MobileStepper
                  steps={ maxSteps }
                  position="static"
                  activeStep={ activeStep }
                  className={ classes.mobileStepper }
                  nextButton={
                    <Button size="small" onClick={ this.handleNext } disabled={ activeStep === maxSteps - 1 }>
                      Next
                      <KeyboardArrowRight />
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={ this.handleBack } disabled={ activeStep === 0 }>
                      <KeyboardArrowLeft />
                      Back
                    </Button>
                  }
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
