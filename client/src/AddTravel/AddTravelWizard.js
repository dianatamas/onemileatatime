import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import ImageUploader from '../ImageUploader'
import WizardStep1 from './WizardStep1'
import WizardStep2 from './WizardStep2'
import WizardStep3 from './WizardStep3'
import WizardStep4 from './WizardStep4'

const styles = {
  root: {
    flexGrow: 1,
  },
  textField: {
    width: '70%',
  },
  menu: {
    width: '70%',
  },
  content: {
    width: 400,
    height: 300
  }
}

const statuses = [
  { value: 0, label: 'Planned' },
  { value: 1, label: 'Done' }
]

class AddTravelWizard extends Component {

  state = {
    activeStep: 0,
    imgUrl: '',
    travel: {status: 0, rating: 0},
  }

  saveUrl = (imgUrl) => {
    let travel = Object.assign({}, this.state.travel, {image: imgUrl})
    this.setState({travel})
  }

  handleChange = (field, value) => {
    let newField = {}
    newField[field] = value
    let travel = Object.assign({}, this.state.travel, newField)
    this.setState({travel})
  }

  handleNext = () => {
    if (this.state.activeStep === 4) {
      this.addTravel()
    }
    else {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }))
    }
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleClose = () => {
    this.props.onClose()
    this.setState({ travel: {status: 0, rating: 0}, imgUrl:'', activeStep: 0 })
  }

  addTravel = () => {
    let data = Object.assign({}, this.state.travel)
    // Set default picture
    if(!data.image) data.image = 'https://res.cloudinary.com/dnfpgtxmr/image/upload/v1542548156/travels/pv5sqm3n8v3ttgkv3hye.jpg'
    this.props.addTravel(data)
    this.handleClose()
  }

  render () {
    const { classes, fullScreen, open } = this.props
    const { activeStep } = this.state

    let nextDisabled = activeStep == 0 && !this.state.travel.title || activeStep == 5

    return (
      <Dialog
        open={ open }
        onClose={ this.handleClose }
        fullScreen={ fullScreen }
      >
        <DialogTitle>Add a new travel</DialogTitle>
        <DialogContent className={ classes.content }>
          <Grid container spacing={ 32 } direction={'column'} style={ {marginTop: 10} }>
          {activeStep === 0 &&
            <WizardStep1
              handleChange={ this.handleChange }
            />
          }
          {activeStep === 1 &&
            <WizardStep2
              handleChange={ this.handleChange }
              statuses={ statuses }
              travel={ this.state.travel }
            />
          }
          {activeStep === 2 &&
            <WizardStep3
              handleChange={ this.handleChange }
            />
          }
          {activeStep === 3 &&
            <WizardStep4
              handleChange={ this.handleChange }
            />
          }
          {activeStep === 4 &&
            <Fragment>
              <Grid item>
                <Typography>Would you like to upload a picture for your travel?</Typography>
              </Grid>
              <ImageUploader
                saveUrl={ this.saveUrl }
              />
            </Fragment>
          }
          </Grid>

        </DialogContent>
        <DialogActions>
          <MobileStepper
            variant="progress"
            steps={ 5 }
            position="static"
            className={ classes.root }
            activeStep={ activeStep }
            LinearProgressProps={ {color:'secondary'} }
            nextButton={
              <Button
                size="small"
                onClick={ this.handleNext }
                disabled={ nextDisabled }
              >
                {activeStep === 4 ? 'Save' : 'Next'}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={ this.handleBack }
                disabled={ activeStep === 0 }
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
          <Button onClick={ this.handleClose }>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    )
  }
}

export default withStyles(styles)(withMobileDialog({breakpoint: 'xs'})(AddTravelWizard))
