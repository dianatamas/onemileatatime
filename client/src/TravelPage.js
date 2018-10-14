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
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Map from './Map'
import InfoCard from './InfoCard'
import TravelSummaryCard from './TravelSummaryCard'

const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#73b9ff"
      },
      {
        "saturation": -65
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#0080ff"
      },
      {
        "saturation": 10
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#0080ff"
      },
      {
        "saturation": -65
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  }
]

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
    predictions: [],
    map: null,
  }

  handlePlaceSearch = (e) => {
    let value=e
    if(this.props.mapsLoaded && value !== '') {
      let service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {input: value},
        predictions => {
          if(predictions !== null ) {
            predictions = predictions.map(pred => pred = {value: pred.place_id, label: pred.description})
            this.setState({ predictions }, () => console.log(this.state.predictions))
          }
        }
      )
    }
    else if (value == '') {
        this.setState({ predictions: [] })
    }
  }

  handleAddPlace = (e) => {
    if(e !== null) {
      let place_id = e.value
      let map = this.state.map
      let marker = new window.google.maps.Marker({
          map: map
      });
      let geocoder = new window.google.maps.Geocoder
      geocoder.geocode({'placeId': place_id}, (results, status) => {
        if (status !== 'OK') {
          window.alert('Geocoder failed due to: ' + status);
          return;
        }
        // Set the position of the marker using the place ID and location.
        let marker = new window.google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          icon: '/images/pin.png'
        });
        var bounds = map.getBounds();
        bounds.extend(marker.position);
        marker.setVisible(true);
        map.fitBounds(bounds)
        this.setState({ addDialog: false })
      })
    }
  }

  createInfoWindow = (e, place,  map) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoCard" />',
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
      render(<InfoCard place={ place }/>, document.getElementById('infoCard'))
    })
    infoWindow.open(map)
  }

  createMarkers = (map) => {
    let travel = this.props.travel
    let places = "places" in travel ? travel.places : []
    let bounds = new window.google.maps.LatLngBounds()
    let markers = []

    places.forEach((place) => {
      let marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: map,
        title: place.name,
        icon: '/images/pin.png'
      });
      bounds.extend(marker.position);
      marker.addListener('click', e => {
        this.createInfoWindow(e, place, map)
      })
      markers.push(marker)
      map.fitBounds(bounds)
    })
    return markers
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
              options={{
                center: { lat: 41.0082, lng: 28.9784 },
                zoom: 8,
                styles: mapStyles
              }}
              onMapLoad={map => {
                this.createMarkers(map)
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
          <Select
            options={ this.state.predictions }
            onInputChange={ this.handlePlaceSearch }
            onChange={ this.handleAddPlace }
            isClearable
          />
        </DialogContent>

      </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(TravelPage)
