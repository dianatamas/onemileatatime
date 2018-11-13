import React, { Component } from 'react'
import Select from 'react-select'

export default class PlacesSearchBox extends Component {

  state = {
    predictions: [], // List of predictions returned by the Maps API
  }

  // Get predictions from the Maps API based on user input
  handlePlaceSearch = (value) => {
    if(this.props.mapsLoaded && value !== '') {
      let service = new window.google.maps.places.AutocompleteService()
      service.getPlacePredictions(
        {input: value},
        predictions => {
          if(predictions !== null ) {
            predictions = predictions.map(pred => pred = {value: pred.place_id, label: pred.description})
            this.setState({ predictions })
          }
        }
      )
    }
    else if (value === '') {
        this.setState({ predictions: [] })
    }
  }

  // Add new place on the map
  handleAddPlace = (place) => {
    if(place !== null) {
      let place_id = place.value
      let place_label = place.label
      // Use the Geocoder API to get the long and lat of the place
      let geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({'placeId': place_id}, (results, status) => {
        if (status !== 'OK') {
          console.log('Geocoder failed due to: ' + status)
          return
        }
        this.props.closeDialog()
        let place = {
          name: place_label,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        }
        this.props.addPlace(place)
      })
    }
  }

  render () {
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
