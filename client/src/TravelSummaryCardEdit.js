import React, { Component, Fragment } from 'react'
import Rating from 'react-rating'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import BudgetBar from './BudgetBar'

const styles = {
  status: {
    width: 100
  },
  budget: {
    width: 100,
    marginBottom: 20
  }
}

const statuses = [
  {value: 1, label:'Done'},
  {value: 0, label:'Planned'}
]

class TravelSummaryCardEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editedTravel: props.travel
    }
  }

  handleChange = (field, value) => {
    let newField = {}
    newField[field] = value
    let editedTravel = Object.assign({}, this.state.editedTravel, newField)
    this.setState({editedTravel}, () => console.log(this.state.editedTravel))
  }

  onSave = () => {
    this.props.updateTravel(this.props.travel._id, this.state.editedTravel)
  }

  render () {
    const { classes, travel } = this.props

    return (
        <Fragment>
          <Grid container spacing={16} style={{ marginBottom:20 }} direction='column'>
            <Typography variant='title' gutterBottom>Edit your travel</Typography>
            <Grid item>
              <TextField
                defaultValue={travel.title}
                label={'Title'}
                onChange={(e) => this.handleChange('title', e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                select
                label={ 'Status' }
                value={ travel.status }
                onChange={ (e) => this.handleChange('status', e.target.value) }
                className={ classes.status }
              >
              {statuses.map(option => (
                <MenuItem key={ option.value } value={ option.value }>
                  { option.label }
                </MenuItem>
              ))}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                defaultValue={travel.description}
                label={'Description'}
                multiline
                onChange={(e) => this.handleChange('description', e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography variant='subheading' gutterBottom>Rating</Typography>
              <Rating
                fractions={ 2 }
                initialRating={ 'rating' in this.state.editedTravel ? this.state.editedTravel.rating : travel.rating }
                onChange={(value) => this.handleChange('rating', value)}
                emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
                fullSymbol={<Star style={{ color: '#1976d2' }}/>}
              />
            </Grid>
            <Grid item>
              <Typography variant='subheading' gutterBottom>Budget</Typography>
              <TextField
                type='number'
                label='Transport'
                defaultValue={travel.housingBudget}
                onChange={(e) => this.handleChange('transportBudget', e.target.value)}
                className={ classes.budget }
              />
              <TextField
                type='number'
                label='Housing'
                defaultValue={travel.transportBudget}
                onChange={(e) => this.handleChange('housingBudget', e.target.value)}
                className={ classes.budget }
              />
              <TextField
                type='number'
                label='Other'
                defaultValue={travel.otherBudget}
                onChange={(e) => this.handleChange('otherBudget', e.target.value)}
                className={ classes.budget }
              />
              <BudgetBar
                housingBudget={ this.state.editedTravel.housingBudget }
                transportBudget={ this.state.editedTravel.transportBudget }
                otherBudget={ this.state.editedTravel.otherBudget }
              />
            </Grid>
          </Grid>

          <Button variant='raised' color='secondary' onClick={this.onSave}>
            Save
          </Button>
          <Button onClick={ this.props.closeEditPane }>
            Cancel
          </Button>
      </Fragment>

    )
  }
}

export default withStyles(styles)(TravelSummaryCardEdit)
