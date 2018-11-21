import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FilterListIcon from '@material-ui/icons/FilterList'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import AddIcon from '@material-ui/icons/Add'
import Map from './Map'
import TravelSummaryCard from './TravelSummaryCard'
import PlacesSearchBox from './PlacesSearchBox'
import Hidden from '@material-ui/core/Hidden'
import withWidth from '@material-ui/core/withWidth'
import ArrowRight from '@material-ui/icons/KeyboardArrowRight'
import IconButton from '@material-ui/core/IconButton'
import withMobileDialog from '@material-ui/core/withMobileDialog'

const styles = {
  tagDone: {
    padding: '5px 8px 5px 8px',
    backgroundColor: '#34a83499',
    maxWidth: 'min-content',
  },
  addButton: {
    position: 'fixed',
    top: '56%',
    right: 0,
    margin: 10
  },
  filterButton: {
    position: 'fixed',
    top: '44%',
    right: 0,
    margin: 10
  },
  expandButton: {
    position: 'fixed',
    top: '50%',
    left: 0,
    margin: 10
  }
}

class AddPlaceDialog extends Component {

  render () {
    return (
      <Dialog
        open={ this.props.addPlaceDialog }
        onClose={ this.props.closeAddPlaceDialog }
        fullScreen={ this.props.fullScreen }
      >
        <DialogTitle>Add a new place</DialogTitle>
        <DialogContent style={{ height: 300, width: 300 }}>
          <PlacesSearchBox
            mapsLoaded={ this.props.mapsLoaded }
            map={ this.props.map }
            closeDialog={ this.props.closeAddPlaceDialog }
            addPlace={ this.props.addPlace }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ this.props.closeAddPlaceDialog }>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class TravelPage extends Component {

  state = {
    addPlaceDialog: false,
    showSidebar: true,
    map: null,
  }

  handleSidebar = () => {
    this.setState((prevState) => {
      return {showSidebar: !prevState.showSidebar}
    })
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

  isSmallScreen = (width) => {
    return width === 'xs'
  }

  render () {
    const { classes, mapsLoaded, travel, width } = this.props
    const { showSidebar } = this.state
    const ResponsiveDialog = withMobileDialog({ breakpoint: 'xs'})(AddPlaceDialog)

    let sideBarWidth, mapWidth
    if(width !== 'xs' && showSidebar) {
      sideBarWidth = 3
      mapWidth = 9
    }
    if(width !== 'xs' && !showSidebar) {
      mapWidth = 12
    }
    if(width === 'xs' && showSidebar) {
      sideBarWidth = 12
    }
    if(width == 'xs' && !showSidebar) {
      mapWidth = 12
    }
    // Show loading bar until Maps and props are laoded
    let travelPage =
      <div><LinearProgress color='secondary'/></div>
    if(mapsLoaded && travel !== undefined) {
      travelPage =
        <Grid container spacing={ 0 } style={{ height: '100%' }}>
          { showSidebar &&
              <Grid item xs={ sideBarWidth }>
                <TravelSummaryCard
                  travel = { travel }
                  updateTravel = { this.props.updateTravel }
                  deleteTravel = { this.props.deleteTravel }
                  handleSidebar = { this.handleSidebar }
                />
              </Grid>
          }
          {(width !== 'xs' || !showSidebar) &&
          <Grid item xs={ mapWidth } style={{ position: 'relative' }}>
            { <Map
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
              { !showSidebar &&
                <Button
                  onClick={ this.handleSidebar }
                  variant="fab"
                  color="secondary"
                  aria-label="Collapse or expand sidebar"
                  className={ classes.expandButton }
                >
                  <ArrowRight />
                </Button>
              }
            </Grid>
          }

          </Grid>
    }

    return (
      <div style={{ height: 'calc(100% - 64px)' }}>
        { travelPage }
        <ResponsiveDialog
          addPlace={ this.addPlace }
          addPlaceDialog={ this.state.addPlaceDialog }
          closeAddPlaceDialog={ this.closeAddPlaceDialog }
          map={ this.state.map }
          mapsLoaded={ this.props.mapsLoaded }
        />
      </div>
    )
  }
}

export default withStyles(styles)(withWidth()(TravelPage))
