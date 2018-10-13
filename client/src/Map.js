import React, { Component } from 'react';
import { render } from 'react-dom';
import { apiKey } from './key'

export default class Map extends Component {

  onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    this.onScriptLoad()
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }} id={this.props.id} />
    );
  }
}
