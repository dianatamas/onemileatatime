import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Header from './Header.js'
import Home from './Home.js'
import TravelPage from './TravelPage.js'
import { apiKey } from './key'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121', //424242
    },
    secondary: {
      main: '#1976d2',
    },
  },
});

export default class App extends Component {
  state = {
    travels: [],
    mapsLoaded: false,
  }

  loadApi = () => {
    fetch('/api/')
      .then(data => data.json())
      .then((res) => {
        this.setState({ travels: res.data }, () => console.log(this.state.travels))
      });
  }

  componentDidMount () {
    this.loadApi()
    
    // Load Google Maps API script
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://maps.google.com/maps/api/js?key=' + apiKey + '&libraries=places';
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
    s.addEventListener('load', e => {
      this.setState({ mapsLoaded: true })
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <Header />
          <Switch>
            <Route
              exact path='/'
              render={() => <Home travels={ this.state.travels }/>}
            />
            <Route
              path='/travels/:id'
              render={(props) =>
                <TravelPage
                  travel={ this.state.travels.find((travel) => {return travel._id == props.match.params.id}) }
                  mapsLoaded={ this.state.mapsLoaded }
                />}
            />
          </Switch>
      </MuiThemeProvider>
    );
  }
}
