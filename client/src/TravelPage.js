import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FilterListIcon from '@material-ui/icons/FilterList'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import AddIcon from '@material-ui/icons/Add'
import Map from './Map'
import TravelSummaryCard from './TravelSummaryCard'
import PlacesSearchBox from './PlacesSearchBox'

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
    addPlaceDialog: false,
    map: null,
  }

  openAddPlaceDialog = () => {
    this.setState({ addPlaceDialog: true })
  }

  closeAddPlaceDialog = () => {
    this.setState({ addPlaceDialog: false })
  }

  addPlace = (place) => {
    this.props.addPlace(this.props.travel._id, place)
  }

  deletePlace = (placeId) => {
    this.props.deletePlace(this.props.travel._id, placeId)
  }

  updatePlace = (placeId, edit) => {
    this.props.updatePlace(this.props.travel._id, placeId, edit)
  }

  render () {
    const { classes, mapsLoaded, travel } = this.props

    // Show loading bar until Maps and props are laoded
    let travelPage =
      <div><LinearProgress color='secondary'/></div>
    if(mapsLoaded && travel !== undefined) {
      travelPage =
        <Grid container spacing={ 0 } style={{ height: '100%' }}>
          <Grid item sm={ 3 } xs={ 0 }>
            <TravelSummaryCard
              travel = { travel }
              updateTravel = { this.props.updateTravel }
              deleteTravel = { this.props.deleteTravel }
            />
          </Grid>
          <Grid item sm={ 9 } xs={ 12 } style={{ position: 'relative' }}>
            {<Map
              id="myMap"
              travel={ this.props.travel }
              onMapLoad={map => this.setState({ map }) }
              deletePlace={ this.deletePlace }
              updatePlace={ this.updatePlace }
              />}
              <Button
                onClick={ this.openAddPlaceDialog }
                variant="fab"
                color="secondary"
                aria-label="Add Place"
                className={ classes.addButton }
              >
                <AddIcon />
              </Button>
              <Button
                variant="fab"
                color="secondary"
                aria-label="Filter"
                className={ classes.filterButton }
              >
                <FilterListIcon />
              </Button>
            </Grid>
          </Grid>
    }

    return (
      <div style={{ height: 'calc(100% - 64px)' }}>
        { travelPage }
        <Dialog
          open={ this.state.addPlaceDialog }
          onClose={ this.closeAddPlaceDialog }
        >
          <DialogTitle>Add a new place</DialogTitle>
          <DialogContent style={{ height: 300, width: 300 }}>
            <PlacesSearchBox
              mapsLoaded={ this.props.mapsLoaded }
              map={ this.state.map }
              closeDialog={ this.closeAddPlaceDialog }
              addPlace={ this.addPlace }
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(TravelPage)
