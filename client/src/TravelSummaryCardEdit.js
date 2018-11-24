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
import CardContent from '@material-ui/core/CardContent'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Save from '@material-ui/icons/Save'
import Clear from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  status: {
    width: 100
  },
  budget: {
    width: 100,
    marginBottom: 10,
    marginRight: 10
  },
  content: {
    overflowY: 'auto'
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
    this.props.closeEditPane()
  }

  render () {
    const { classes, travel } = this.props
    const { editedTravel } = this.state

    return (
        <CardContent classes={{ root: classes.content }} style={{ height: '100%'}}>
          <Grid container style={{ marginBottom:10 }} direction='column'>
            <Grid item style={{ display: 'flex', alignItems: 'center'}}>
              <Typography variant='subheading' style={{ flexGrow: 1}}>Edit your travel</Typography>
              <IconButton
                onClick={this.onSave}
                color="secondary"
                aria-label="Save"
              >
                <Save fontSize='small'/>
              </IconButton>
              <IconButton
                onClick={ this.props.closeEditPane }
                aria-label="Cancel"
              >
                <Clear fontSize='small'/>
              </IconButton>
            </Grid >
            <Grid item style={{ display: 'flex' }}>
              <TextField
                defaultValue={ travel.title }
                label={'Title'}
                onChange={(e) => this.handleChange('title', e.target.value)}
                margin='normal'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ Boolean(Number(editedTravel.status)) }
                    onChange={(e) => this.handleChange('status', Number(e.target.checked))}
                    value={ 'status' }
                    style={{ marginLeft: 20,  marginTop: 5 }}
                  />
                }
                label={Boolean(Number(editedTravel.status)) ? 'Done' : 'Planned'}
              />
            </Grid>

            <Grid item>
              <TextField
                defaultValue={travel.description}
                label={'Description'}
                multiline
                onChange={(e) => this.handleChange('description', e.target.value)}
                margin='normal'
              />
            </Grid>
            <Grid item>
              <Typography style={{ marginTop: 16 }} variant='subheading' gutterBottom>Rating</Typography>
              <Rating
                fractions={ 2 }
                initialRating={ 'rating' in this.state.editedTravel ? this.state.editedTravel.rating : travel.rating }
                onChange={(value) => this.handleChange('rating', value)}
                emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
                fullSymbol={<Star style={{ color: '#1976d2' }}/>}
                style={{marginBottom: 8}}
              />
            </Grid>
            <Grid item>
              <Typography variant='subheading' gutterBottom>Budget</Typography>
              <TextField
                type='number'
                label='Transport'
                defaultValue={travel.housingBudget}
                onChange={(e) => this.handleChange('housingBudget', e.target.value)}
                className={ classes.budget }
              />
              <TextField
                type='number'
                label='Housing'
                defaultValue={travel.transportBudget}
                onChange={(e) => this.handleChange('transportBudget', e.target.value)}
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
      </CardContent>

    )
  }
}

export default withStyles(styles)(TravelSummaryCardEdit)
