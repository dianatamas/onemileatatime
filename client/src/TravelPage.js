import React, { Component } from 'react';
import { render } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';

import Map from './Map';
import TravelSummaryCard from './TravelSummaryCard';
import PlacesSearchBox from './PlacesSearchBox';



const styles = {
  tagDone: {
    padding: '5px 8px 5px 8px',
    backgroundColor: '#34a83499',
    maxWidth: 'min-content',
  },
  addButton: {
    position: 'absolute',
    top: '56%',
    left: '92%',
  },
  filterButton: {
    position: 'absolute',
    top: '44%',
    left: '92%',
  }

}

class TravelPage extends Component {

  state = {
    addDialog: false,
    map: null,
  }

  render () {
    const { classes, mapsLoaded, travel } = this.props
    let travelPage
    if(mapsLoaded && travel !== undefined) {
      travelPage =
        <Grid container spacing={8} style={{height: '100%'}}>
          <Grid item xs={12} sm={3}>
            <TravelSummaryCard
              travel = { travel }
            />
          </Grid>
          <Grid item xs={12} sm={9} style={{position: 'relative'}}>
            <Map
              id="myMap"
              travel={ this.props.travel }
              onMapLoad={map => {
                this.setState({ map })
              }}
              />
              <Button
                onClick={ () => this.setState({addDialog: true}) }
                variant="fab"
                color="secondary"
                aria-label="Add"
                className={classes.addButton}
              >
                <AddIcon />
              </Button>
              <Button variant="fab" color="secondary" aria-label="Filter" className={classes.filterButton}>
                <FilterListIcon />
              </Button>
            </Grid>
          </Grid>
    }

    return (
      <div style={{height: 'calc(100% - 64px)'}}>
      { travelPage }
      <Dialog
        open={ this.state.addDialog }
        onClose={ () => this.setState({addDialog: false}) }
      >
        <DialogTitle>Add a new place</DialogTitle>
        <DialogContent style={{ height: 300, width: 300}}>
          <PlacesSearchBox
            mapsLoaded={ this.props.mapsLoaded }
            map={ this.state.map }
            closeDialog={ () => this.setState({ addDialog: false })}
          />
        </DialogContent>
      </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(TravelPage)
