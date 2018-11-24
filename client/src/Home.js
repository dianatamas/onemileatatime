import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TravelCard from './TravelCard.js'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import AddTravelWizard from './AddTravel/AddTravelWizard'

const styles = {
  container: {
    backgroundColor: 'white',
    width:'100%',
    height: 'calc(100% - 64px)'
  },
  root: {
    flexGrow: 1,
  },
  images: {
    opacity: 0.8,
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
  lightFont: {
    fontWeight:300,
  },
  padding32: {
    padding: 32
  },
  tag: {
    backgroundColor: '#1976d2',
    color: '#fff',
    display: 'inline-block',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 2,
    textAlign: 'center'
  },
  fixedButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: 15
  },
  fixedButton0: {
    margin: 'auto',
    marginTop: 50
  },
  title: {
    paddingTop: 50,
    paddingBottom: 50,
    letterSpacing: 3
  }
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
        <div className={ classes.container }>

          <Typography variant='display1' align='center' className={ classes.title }>
            Welcome to your <span className={ classes.tag }>travel blog</span>!
          </Typography>

          <div id='travels' className={ classes.padding32 }>
            <Typography variant="headline" gutterBottom>Travels</Typography>
            <Grid container spacing={ 24 }>
              { travels.length === 0 ?
                <Tooltip title='Add new travel'>
                  <Button
                    onClick={ this.openAddWizard }
                    className={ classes.fixedButton0 }
                    variant="extendedFab"
                    color="secondary"
                    aria-label="Add Travel"
                  > Add your travels
                    <AddIcon />
                  </Button>
                </Tooltip>
                :
                travels.map(travel =>
                  <Grid item key={ travel._id } >
                    <TravelCard travel={ travel } deleteTravel={ this.props.deleteTravel }/>
                  </Grid>
                )
              }
            </Grid>
            { travels.length > 0 &&
              <Tooltip title='Add new travel'>
                <Button
                  onClick={ this.openAddWizard }
                  className={ classes.fixedButton }
                  variant="fab"
                  color="secondary"
                  aria-label="Add Travel"
                >
                  <AddIcon />
                </Button>
              </Tooltip>
            }
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

export default withRouter(withStyles(styles)(Home))
