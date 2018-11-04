import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TravelCard from './TravelCard.js'
import frontImg from './images/cali.jpeg'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import AddTravelWizard from './AddTravel/AddTravelWizard'

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

  state = {
    showAddDialog: false,
  }

  openAddWizard = () => {
    this.setState({ showAddDialog: true })
  }

  closeAddWizard = () => {
    this.setState({ showAddDialog: false })
  }

  render() {
    const { classes, travels } = this.props

    return (
      <Fragment>
        <div>
          <img src={ frontImg } alt='' className={ classes.images } />
          <div className={ classes.displayMiddle }>
            <h1><span className={ classes.blackBox }>my</span><span className={ classes.lightFont }>Travels</span></h1>
          </div>
          <div id='travels'>
            <Paper className={ classes.padding32 }>
              <Typography variant="headline" gutterBottom>Travels</Typography>
              <Grid container spacing={ 24 } alignItems={ 'center' }>
              {travels.map(travel =>
                <Grid item key={ travel._id }>
                  <TravelCard travel={ travel } deleteTravel={ this.props.deleteTravel }/>
                </Grid>
              )}
                <Grid item>
                  <Button
                    onClick={ this.openAddWizard }
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
        <AddTravelWizard
          open={ this.state.showAddDialog }
          onClose={ this.closeAddWizard }
          addTravel={ this.props.addTravel }
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(Home)
