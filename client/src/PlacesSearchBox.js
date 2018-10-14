import React, { Component } from 'react';
import Select from 'react-select';

export default class PlacesSearchBox extends Component {

  state = {
    predictions: []
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
      let map = this.props.map
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
        map.fitBounds(bounds);
        this.props.closeDialog();
      })
    }
  }

  render () {
    const { predictions, handlePlaceSearch, handleAddPlace } = this.props

    return (
      <Select
        options={ this.state.predictions }
        onInputChange={ this.handlePlaceSearch }
        onChange={ this.handleAddPlace }
        isClearable
      />
    )
  }
}
