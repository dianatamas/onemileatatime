import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import { apiKey } from './key'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Header from './Header.js'
import Home from './Home.js'
import LoginPage from './LoginPage'
import TravelPage from './TravelPage.js'
import Auth from './utils/Auth'

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

class App extends Component {

  state = {
    travels: [], // List of existing travels
    mapsLoaded: false, // Whether the Maps API is loaded or not
  }

  componentDidMount () {
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
    if(Auth.isUserAuthenticated()) {
      this.getTravels()
    }
  }

  componentWillUnmount () {
    Auth.deauthenticateUser()
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
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(edit)
    })
    .then(data => data.json())
    .then((data) => {
      this.setState({ travels: data })
    })
  }

  // Add a new travel and reload the list of travels
  addTravel = (data) => {
    fetch('/travels/add', {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(data),
    })
    .then(data => data.json())
    .then((data) => {
      this.setState({ travels: data })
    })
  }

  // Delete a travel, reload the list of travels and go back to Home page
  deleteTravel = (id) => {
    fetch('/travels/delete/'+id, {
      method: "DELETE",
      credentials: "same-origin",
    })
    .then(data => data.json())
    .then((data) => {
      this.setState({ travels: data })
      this.props.history.push('/')
    })
  }

  // Update an existing place and reload the list of travels
  updatePlace = (travelId, placeId, edit) => {
    let data = {travelId: travelId, placeId: placeId, place: edit}
    fetch('/places/edit', {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(data),
    })
    .then(data => data.json())
    .then((data) => {
      this.setState({ travels: data })
    })
  }

  // Add a new place to an existing travel and reload the list of travels
  addPlace = (travelId, place) => {
    let data = {travelId: travelId, place: place}
    fetch('/places/add', {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(data),
    })
    .then(data => data.json())
    .then((data) => {
      this.setState({ travels: data })
    })
  }

  // Delete a place from an existing travel and reload the list of travels
  deletePlace = (travelId, placeId) => {
    let data = {travelId: travelId, placeId: placeId}
    fetch('/places/delete/', {
      method: "DELETE",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(data),
    })
    .then(data => data.json())
    .then((data) => {
      this.setState({ travels: data })
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={ theme }>
        <Header />
        <Switch>

          <Route
            exact path='/login'
            render={ (props) =>
              !Auth.isUserAuthenticated() ? (
                <LoginPage />
              ) : (
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: props.location },
                  }}
                />
              )
            }
          />

          <Route
            exact path='/'
            render={props =>
              Auth.isUserAuthenticated() ? (
                <Home
                  travels={ this.state.travels }
                  addTravel={ this.addTravel }
                  deleteTravel={ this.deleteTravel }
                  getTravels={ this.getTravels }
                />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location },
                  }}
                />
              )
            }
          />

          <Route
            path='/travels/:id'
            render={props =>
              Auth.isUserAuthenticated() ? (
                <TravelPage
                  travel={ this.state.travels.find((travel) => {return travel._id === props.match.params.id}) }
                  mapsLoaded={ this.state.mapsLoaded }
                  updateTravel={ this.updateTravel }
                  deleteTravel={ this.deleteTravel }
                  addPlace={ this.addPlace }
                  deletePlace={ this.deletePlace }
                  updatePlace={ this.updatePlace }
                />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location },
                  }}
                />
              )
            }
          />

        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App)
