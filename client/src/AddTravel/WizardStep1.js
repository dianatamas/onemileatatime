import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const styles = {
  textField: {
    width: '70%',
  },
}

class WizardStep1 extends Component {

  render () {
    const { classes } = this.props

    return (
      <Fragment>
        <Grid item>
          <Typography>Please start by giving your travel a title and a short description</Typography>
        </Grid>
        <Grid item>
          <TextField
            label='Title'
            onChange={ (e) => this.props.handleChange('title', e.target.value) }
            className={ classes.textField }
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label='Description'
            onChange={ (e) => this.props.handleChange('description', e.target.value) }
            className={ classes.textField }
            required
            multiline
            rowsMax="3"
          />
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(WizardStep1)
