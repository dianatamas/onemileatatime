import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Rating from 'react-rating';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageUploader from './ImageUploader'


const styles = {
  root: {
    maxWidth: 400,
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
    fetch('/travels/add',
    {
          method: "POST",
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(data => data.json())
      .then(data => console.log(data))
  }

  render () {
    const { classes, open, onClose } = this.props
    const { activeStep } = this.state

    return (
      <Dialog
        open={ open }
        onClose={ onClose }
        maxWidth={ 'md' }
        PaperProps={{ style: {width: '50%', height:'60%'} }}
      >
        <DialogTitle>Add a new travel</DialogTitle>
        <DialogContent >
          <Grid container spacing={32} direction={'column'} style={{marginTop: 10}}>
          {activeStep == 0 &&
            <Fragment>
              <Grid item>
                <TextField
                  label='Title'
                  onChange={(e) => this.handleChange('title', e.target.value)}
                  variant={'outlined'}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Description'
                  onChange={(e) => this.handleChange('description', e.target.value)}
                  multiline
                  rows={4}
                  variant={'outlined'}
                  rowsMax="4"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Fragment>
          }
          {activeStep == 1 &&
            <Fragment>
              <Grid item>
                <TextField
                  label='Status'
                  onChange={(e) => this.handleChange('status', e.target.value)}
                  variant={'outlined'}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                  value={this.state.travel.status}
                  onChange={(e) => this.setState({status: e.target.value})}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                >
                {statuses.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
              </Grid>
              <Grid item>
                <Rating
                  fractions={2}
                  initialRating={this.state.travel.rating}
                  emptySymbol={<StarBorder style={{color: '#1976d2'}}/>}
                  fullSymbol={<Star style={{color: '#1976d2'}}/>}
                  onChange={(e) => this.handleChange('rating', e)}
                />
              </Grid>
            </Fragment>
          }
          {activeStep == 2 &&
            <Fragment>
              <Grid item>
                <TextField
                  label="From"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.handleChange('startDate', e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="To"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  onChange={(e) => this.handleChange('endDate', e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Fragment>
          }
          {activeStep == 3 &&
            <Fragment>
              <Grid item>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label="Housing Budget"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                  type='number'
                  onChange={(e) => this.handleChange('housingBudget', e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label="Transport Budget"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                  onChange={(e) => this.handleChange('transportBudget', e.target.value)}
                  type='number'
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label="Other Budget"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                  onChange={(e) => this.handleChange('otherBudget', e.target.value)}
                  type='number'
                />
              </Grid>
            </Fragment>
          }
          {activeStep == 4 &&
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
