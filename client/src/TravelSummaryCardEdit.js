import React, { Component, Fragment } from 'react'
import Rating from 'react-rating'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import BudgetBar from './BudgetBar'

const styles = {
  tagDone: {
    padding: '5px 8px 5px 8px',
    backgroundColor: '#34a83499',
    maxWidth: 'min-content',
  },

  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
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
    const { classes, travel, updateTravel } = this.props
    const maxSteps = 1

    // Calculate relative flex-grow for budgets


    return (
          <Fragment>
            <Grid container alignItems={ 'center' } style={{ marginBottom:20 }}>
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
                  label={'Status'}
                  value={travel.status}
                  onChange={(e) => this.handleChange('status', e.target.value)}
                >
                {statuses.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
              </Grid>
            </Grid>
            <Rating
              fractions={ 2 }
              initialRating={ 'rating' in this.state.editedTravel ? this.state.editedTravel.rating : travel.rating }
              onChange={(value) => this.handleChange('rating', value)}
              emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
              fullSymbol={<Star style={{ color: '#1976d2' }}/>}
            />
            <TextField
              defaultValue={travel.description}
              label={'Description'}
              multiline
              onChange={(e) => this.handleChange('description', e.target.value)}
            />
            <Typography variant='subheading'>Budget</Typography>
            <TextField
              type='number'
              label='Transport Budget'
              defaultValue={travel.housingBudget}
              onChange={(e) => this.handleChange('transportBudget', e.target.value)}
            />
            <TextField
              type='number'
              label='Housing Budget'
              defaultValue={travel.transportBudget}
              onChange={(e) => this.handleChange('housingBudget', e.target.value)}
            />
            <TextField
              type='number'
              label='Other Budget'
              defaultValue={travel.otherBudget}
              onChange={(e) => this.handleChange('otherBudget', e.target.value)}
            />
            <BudgetBar
              housingBudget={ this.state.editedTravel.housingBudget }
              transportBudget={ this.state.editedTravel.transportBudget }
              otherBudget={ this.state.editedTravel.otherBudget }
            />
            <Button variant='raised' color='secondary' onClick={this.onSave}>
              Save
            </Button>
        </Fragment>

    )
  }
}

export default withStyles(styles)(TravelSummaryCardEdit)
