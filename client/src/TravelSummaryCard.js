import React, { Component } from 'react';
import Rating from 'react-rating';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

const tutorialSteps = [
  {
    label: 'How to be happy :)',
    imgPath: "https://i.pinimg.com/originals/d1/e2/25/d1e225a6ca54882b40bbcd4c5dbc60a1.jpg",
  },
  {
    label: '1. Work with something that you like, like…',
    imgPath: 'https://i.pinimg.com/originals/c9/fd/02/c9fd02c1f6faa408efe7b41e22a483dc.jpg',
  },
];

const styles = {
  tagDone: {
    padding: '5px 8px 5px 8px',
    marginBottom: 20,
    backgroundColor: '#34a83499',
    maxWidth: 'min-content',
  },
  budgetBar: {
    flexGrow: 1,
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
  };

  handleNext = () => {
   this.setState(prevState => ({
     activeStep: prevState.activeStep + 1,
   }));
 };

 handleBack = () => {
   this.setState(prevState => ({
     activeStep: prevState.activeStep - 1,
   }));
 };

  render () {
    const { classes, travel } = this.props
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <Card style={{marginTop: 5}}>
        <CardContent>
          <Typography variant='headline' gutterBottom>{travel.title.toUpperCase()}</Typography>
          <Typography gutterBottom>{travel.description}</Typography>
          <div className={classes.tagDone}>
            <Typography variant='button' style={{color: 'white', fontWeight: 500}}>{travel.status}</Typography>
          </div>
          <Rating
            fractions={2}
            initialRating={travel.rating}
            emptySymbol={<FavoriteBorder style={{color: 'pink'}}/>}
            fullSymbol={<Favorite style={{color: 'pink'}}/>}
          />
          <Typography variant='subheading'>Budget</Typography>
          <div style={{display: 'flex', marginBottom: 30}}>
            <Tooltip title={'Housing Budget: ' + travel.housingBudget + ' £'}>
              <div className={classes.budgetBar} style={{backgroundColor: '#1976d2'}}></div>
            </Tooltip>
            <Tooltip title={'Transport Budget: ' + travel.transportBudget + ' £'}>
              <div className={classes.budgetBar} style={{backgroundColor: '#f44336'}}></div>
            </Tooltip>
            <Tooltip title={'Other Budget: ' + travel.otherBudget + ' £'}>
              <div className={classes.budgetBar} style={{backgroundColor: '#f4d236'}}></div>
            </Tooltip>
          </div>

          <img
            className={classes.img}
            src={tutorialSteps[activeStep].imgPath}
            alt={tutorialSteps[activeStep].label}
          />
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.mobileStepper}
            nextButton={
              <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {<KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                {<KeyboardArrowLeft />}
                Back
              </Button>
            }
            />
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(TravelSummaryCard)
