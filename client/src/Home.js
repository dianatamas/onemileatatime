import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TravelCard from './TravelCard.js'
import frontImg from './images/cali.jpeg'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root: {
    flexGrow: 1,
  },
  images: {
    opacity: 0.7,
    maxWidth: '100%',
    height: 'auto'
  },
  displayMiddle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    letterSpacing: 3
  },
  blackBox: {
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 15,
    backgroundColor: '#212121',
    fontWeight:300,
  },
  lightFont: {
    fontWeight:300,
  },
  padding32: {
    padding: 32
  },
};

class Home extends Component {

  addTravel = () => {
    let data = {title:'random travel', description:'bouyah'}
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

  render() {
    const { classes, travels } = this.props;
    return (
      <div>
        <img src={frontImg} className={classes.images} />
        <div className={classes.displayMiddle}>
          <h1><span className={classes.blackBox}>my</span> <span className={classes.lightFont}>Travels</span></h1>
        </div>

        <div id='travels'>
          <Paper className={classes.padding32}>
            <Typography variant="headline" gutterBottom>
              Travels
            </Typography>
            <Grid container spacing={24}>
            {travels.map(travel =>
              <Grid item key={travel._id}>
                <TravelCard
                  travel={ travel }
                />
              </Grid>
            )}
            <Grid item>
              <Button
                onClick={ this.addTravel }
                variant="fab"
                color="secondary"
                aria-label="Add"
              >
                <AddIcon />
              </Button>
            </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
