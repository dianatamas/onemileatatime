import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import FormLabel from '@material-ui/core/FormLabel'
import Rating from 'react-rating'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'

const styles = {
  textField: {
    width: '70%',
  },
  menu: {
    width: '70%',
  },
  label: {

  }
}

class WizardStep2 extends Component {

  render () {
    const { classes, statuses, travel, handleChange } = this.props

    return (
      <Fragment>
        <Grid item>
          <Typography>Have you already completed your travel?</Typography>
        </Grid>
        <Grid item>
          <TextField
            label='Status'
            onChange={ (e) => handleChange('status', e.target.value) }
            className={ classes.textField }
            select
            value={ travel.status }
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
          {statuses.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        </Grid>
        {travel.status === 1 &&
          <Fragment>
            <Grid item>
              <Typography>How would you rate your travel?</Typography>
            </Grid>
            <Grid item>
              <div style={{display:'flex', flexDirection: 'column'}}>
                <FormLabel style={{marginBottom: 10}}>Rating</FormLabel>
                <Rating
                  fractions={2}
                  initialRating={ travel.rating }
                  emptySymbol={<StarBorder style={{color: '#1976d2'}}/>}
                  fullSymbol={<Star style={{color: '#1976d2'}}/>}
                  onChange={(e) => handleChange('rating', e)}
                />
              </div>
            </Grid>
          </Fragment>
        }
      </Fragment>
    )
  }
}

export default withStyles(styles)(WizardStep2)
