import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import queryString from "query-string"
import Auth from './utils/Auth'

const styles = {
    container: {
      marginTop: 100
    },
    googleButton: {
      backgroundColor: '#db3236',
      color: 'white',
      margin: 50
    }
}

class LoginPage extends Component {

  componentDidMount() {
    var query = queryString.parse(this.props.location.search)
    if (query.token) {
      // Authenticate user and redirect to Home page if user is logged in
      Auth.authenticateUser(query.token)
      this.props.history.push("/")
    }
  }

  render () {
    const { classes } = this.props

    return (
      <Fragment>
        <Grid container direction={"column"} className={classes.container} alignItems='center' justifyContent='center'>
          <Grid item>
            <Typography variant='title' gutterBottom> Login with... </Typography>
          </Grid>
          <Grid item>
            <Button className={classes.googleButton} href="http://localhost:3001/auth/google" >
              Google+
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(LoginPage))
