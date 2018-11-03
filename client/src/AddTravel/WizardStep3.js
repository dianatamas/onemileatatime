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

class WizardStep3 extends Component {
  render () {
    const { classes, handleChange } = this.props

    return (
      <Fragment>
        <Grid item>
          <Typography>Please enter the date at which your travel started and ended</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="From"
            onChange={ (e) => handleChange('startDate', e.target.value) }
            className={ classes.textField }
            InputLabelProps={{
              shrink: true
            }}
            type="date"
          />
        </Grid>
        <Grid item>
          <TextField
            label="To"
            onChange={ (e) => handleChange('endDate', e.target.value) }
            className={ classes.textField }
            InputLabelProps={{
              shrink: true
            }}
            type="date"
          />
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(WizardStep3)
