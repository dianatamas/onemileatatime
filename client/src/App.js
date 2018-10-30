import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Header from './Header.js'
import Home from './Home.js'
import TravelPage from './TravelPage.js'
import { apiKey } from './key'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#1976d2',
    },
  },
})

export default class App extends Component {

  state = {
    travels: [], // List of existing travels
    mapsLoaded: false, // Whether the Maps API is loaded or not
  }

  componentDidMount () {
    // Load travels rom database
    this.getTravels()

    // Load Google Maps API script
    var s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = 'https://maps.google.com/maps/api/js?key=' + apiKey + '&libraries=places'
    var x = document.getElementsByTagName('script')[0]
    x.parentNode.insertBefore(s, x)
    // Update state when the script has finished loading
    s.addEventListener('load', e => {
      this.setState({ mapsLoaded: true })
    })
  }

  // Get the list of travels from the database
  getTravels = () => {
    fetch('/travels/')
      .then(data => data.json())
      .then((data) => {
        this.setState({ travels: data })
      })
  }

  // Update an existing travel and reload the list of travels
  updateTravel = (id, edit) => {
    fetch('/travels/edit/'+id, {
      method: "PUT",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(edit)}
    )
    .then(data => data.json())
    .then((res) => {
      this.setState({ travels: res.data })
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={ theme }>
        <Header />
        <Switch>
          <Route
            exact path='/'
            render={() => <Home travels={ this.state.travels }/>}
          />
          <Route
            path='/travels/:id'
            render={ (props) =>
              <TravelPage
                travel={ this.state.travels.find((travel) => {return travel._id === props.match.params.id}) }
                mapsLoaded={ this.state.mapsLoaded }
                updateTravel={ this.updateTravel }
              />
            }
          />
        </Switch>
      </MuiThemeProvider>
    );
  }
}
