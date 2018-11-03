import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ImageUploader from '../ImageUploader'
import WizardStep1 from './WizardStep1'
import WizardStep2 from './WizardStep2'
import WizardStep3 from './WizardStep3'
import WizardStep4 from './WizardStep4'

const styles = {
  root: {
    maxWidth: 300,
    flexGrow: 1,
  },
  textField: {
    width: '70%',
  },
  menu: {
    width: '70%',
  },
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
    this.setState({travel}, () => console.log(this.state.travel))
  }

  handleNext = () => {
    if (this.state.activeStep === 4) {
      this.addTravel()
    }
    else {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }

  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  addTravel = () => {
    let data = Object.assign({}, this.state.travel)
    this.props.addTravel(data)
    this.props.onClose()
  }

  render () {
    const { classes, open, onClose } = this.props
    const { activeStep } = this.state

    return (
      <Dialog
        open={ open }
        onClose={ onClose }
        maxWidth={ 'md' }
        PaperProps={{ style: {width: '30%', height:'60%'} }}
      >
        <DialogTitle>Add a new travel</DialogTitle>
        <DialogContent >
          <Grid container spacing={32} direction={'column'} style={{marginTop: 10}}>
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
            <ImageUploader
              saveUrl={ this.saveUrl }
            />
          }
          </Grid>

        </DialogContent>
        <DialogActions>
          <MobileStepper
            variant="progress"
            steps={5}
            position="static"
            className={classes.root}
            activeStep={activeStep}
            LinearProgressProps={{color:'secondary'}}
            nextButton={
              <Button size="small" onClick={this.handleNext} disabled={activeStep === 5}>
                {activeStep === 4 ? 'Save' : 'Next'}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </DialogActions>
      </Dialog>

    )
  }
}

export default withStyles(styles)(AddTravelWizard)
