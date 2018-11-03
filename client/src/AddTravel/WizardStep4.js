import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = {
  textField: {
    width: '70%',
  },
}

class WizardStep4 extends Component {
  render () {
    const { classes, handleChange } = this.props

    return (
      <Fragment>
        <Grid item>
          <Typography>How much did you spend on this travel?</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Housing Budget"
            onChange={ (e) => handleChange('housingBudget', e.target.value) }
            className={ classes.textField }
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            type='number'
          />
        </Grid>
        <Grid item>
          <TextField
            label="Transport Budget"
            onChange={ (e) => handleChange('transportBudget', e.target.value) }
            className={ classes.textField }
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            type='number'
          />
        </Grid>
        <Grid item>
          <TextField
            label="Other Budget"
            onChange={ (e) => handleChange('otherBudget', e.target.value) }
            className={ classes.textField }
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            type='number'
          />
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(WizardStep4)
