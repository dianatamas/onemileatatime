import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Auth from './utils/Auth'

const styles = {
    container: {
    },
    googleButton: {
      margin: '20px auto',
      width: 250,
      display: 'block'
    },
    divider: {
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: '#00000024'
    }
}

class LoginPage extends Component {

  componentDidMount() {
    let token = this.props.location.search.split('=')[1]
    if (token) {
      // Authenticate user and redirect to Home page if user is logged in
      Auth.authenticateUser(token)
      this.props.history.push("/")
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div style={{ paddingTop: 100 }} >
        <Grid container>
          <Grid item xs={8} sm={5} md={3} style={{margin: 'auto'}}>
            <Card>
              <CardContent>
                <Typography variant='subheading' align='center'>One Mile at A Time</Typography>
                <Divider className={ classes.divider } />
                <Button className={ classes.googleButton } href="/auth/google">
                  <span className="google-button__icon google-button__icon--plus">
                    <svg viewBox="0 0 93 60" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.12 28.862C.375 13.725 14.29.47 29.428.974c7.253-.337 14.07 2.82 19.626 7.252-2.37 2.694-4.826 5.29-7.45 7.716-6.677-4.615-16.174-5.934-22.852-.603-9.552 6.606-9.987 22.206-.798 29.318 8.936 8.11 25.826 4.083 28.295-8.333-5.597-.084-11.21 0-16.806-.182-.013-3.34-.027-6.678-.013-10.016 9.357-.028 18.714-.043 28.085.028.56 7.856-.477 16.217-5.303 22.712-7.31 10.283-21.983 13.285-33.43 8.88C7.29 53.37-.848 41.235.12 28.862zm75.643-11.167h8.347c.014 2.792.028 5.598.056 8.39 2.792.028 5.598.028 8.39.056v8.348c-2.792.028-5.584.042-8.39.07-.028 2.805-.042 5.597-.056 8.39h-8.36c-.03-2.793-.03-5.585-.057-8.376l-8.39-.084V26.14c2.793-.027 5.584-.04 8.39-.056.014-2.805.042-5.597.07-8.39z" fill="#DC4E41"/>
                    </svg>
                  </span>
                  <span className="google-button__text">Sign in with Google</span>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(LoginPage))
