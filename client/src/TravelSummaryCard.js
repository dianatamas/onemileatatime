import React, { Component, Fragment } from 'react'
import Rating from 'react-rating'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import EditIcon from '@material-ui/icons/Edit'
import TravelSummaryCardEdit from './TravelSummaryCardEdit'

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
    showEditDialog: false,
  }

  openEditDialog = () => {
    this.setState({ showEditDialog: true })
  }

  closeEditDialog = () => {
    this.setState({ showEditDialog: false })
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
    const { activeStep } = this.state
    const maxSteps = 1

    // Calculate relative flex-grow for budgets
    const totalBudget = travel.housingBudget + travel.transportBudget + travel.otherBudget
    const housingFlexGrow = travel.housingBudget / totalBudget
    const transportFlexGrow = travel.transportBudget / totalBudget
    const otherFlexGrow = travel.otherBudget / totalBudget

    return (
      <Fragment>
        <Card style={{ marginTop: 5 }}>
          <CardContent>
            <TravelSummaryCardEdit travel={ this.props.travel } updateTravel={ this.props.updateTravel }/>
            {/*<Grid container alignItems={ 'center' } style={{ marginBottom:20 }}>
              <Grid item>
                <Typography variant='headline' style={{ fontWeight: 500, marginRight: 10 }} >
                  { travel.title.toUpperCase() }
                </Typography>
                <Button
                  onClick={ this.openEditDialog }
                  variant="fab"
                  color="secondary"
                  aria-label="Edit Travel"
                >
                  <EditIcon />
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
            <div style={{ display: 'flex', marginBottom: 30 }}>
              <Tooltip title={'Housing Budget: ' + travel.housingBudget + ' £'}>
                <div className={ classes.budgetBar } style={{ backgroundColor: '#1976d2', flexGrow: housingFlexGrow }}></div>
              </Tooltip>
              <Tooltip title={'Transport Budget: ' + travel.transportBudget + ' £'}>
                <div className={ classes.budgetBar } style={{ backgroundColor: '#2196F3', flexGrow: transportFlexGrow }}></div>
              </Tooltip>
              <Tooltip title={'Other Budget: ' + travel.otherBudget + ' £'}>
                <div className={ classes.budgetBar } style={{ backgroundColor: '#BBDEFB', flexGrow: otherFlexGrow }}></div>
              </Tooltip>
            </div>
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
            />*/}
          </CardContent>
        </Card>

      </Fragment>
    )
  }
}

export default withStyles(styles)(TravelSummaryCard)
