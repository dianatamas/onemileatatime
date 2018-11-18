import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FlightIcon from '@material-ui/icons/Flight'
import Auth from './utils/Auth'

const styles = {
  grow: {
    flexGrow: 1,
    letterSpacing: 2
  },
  icons: {
    marginRight: 15,
  },
  link: {
    color: 'inherit',
    textDecoration:'inherit',
  },
};

class Header extends Component {

  render() {
    const { classes } = this.props

    return (
      <AppBar position="static">
        <Toolbar>
          <Link to='/' className={ classes.link }>
            <FlightIcon className={ classes.icons }/>
          </Link>
          <Link to='/' className={ classes.link }>
            <Typography variant="button" color="inherit" className={ classes.grow }>
              One Mile at A Time
            </Typography>
          </Link>
          <div style={{flexGrow:1}} />
          {Auth.isUserAuthenticated() &&
            <Button onClick={() => Auth.deauthenticateUser()} href='/auth/logout' color='inherit'>
              Log Out
            </Button>
          }
          {!Auth.isUserAuthenticated() &&
            <Button href='/login' color='inherit'>
              Log In
            </Button>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
