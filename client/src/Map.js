import React, { Component } from 'react';
import { render } from 'react-dom';
import { apiKey } from './key';
import InfoCard from './InfoCard'

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
const options = {
  center: { lat: 41.0082, lng: 28.9784 },
  zoom: 8,
  styles: mapStyles
}

export default class Map extends Component {

  state = {
    infoWindow: null
  }

  createInfoWindow = (e, place,  map) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoCard" />',
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
      render(<InfoCard place={ place } deletePlace={ this.props.deletePlace } updatePlace={ this.props.updatePlace }
        />, document.getElementById('infoCard'))
    })
    infoWindow.open(map)
    if (this.state.infoWindow) this.state.infoWindow.close()
    this.setState({ infoWindow })
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

  onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      options);
    this.createMarkers(map)
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    this.onScriptLoad()
  }

  componentDidUpdate(prevProps) {
    if (this.props.travel !== prevProps.travel) {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }} id={this.props.id} />
    );
  }
}
