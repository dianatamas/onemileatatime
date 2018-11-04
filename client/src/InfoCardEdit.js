import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Rating from 'react-rating'
import Button from '@material-ui/core/Button'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LoupeIcon from '@material-ui/icons/Loupe'

const styles = {
  content: {
    height: 120
  },
}

class InfoCardEdit extends React.Component {

  state = {
    editedPlace: {},
    tab: 0
  }

  handleChange = (field, value) => {
    let newField = {}
    newField[field] = value
    let editedPlace = Object.assign({}, this.state.editedPlace, newField)
    this.setState({editedPlace}, () => console.log(this.state.editedPlace))
  }

  onSave = () => {
    this.props.updatePlace(this.props.place._id, this.state.editedPlace)
  }

  handleTabChange = (event, tab) => {
    this.setState({ tab });
  };

  render () {
    const { classes, place } = this.props
    return (
      <Fragment>
        <CardHeader title={place.name} />
        <Tabs
          value={this.state.tab}
          onChange={this.handleTabChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<Star />} label="REVIEW" />
          <Tab icon={<LoupeIcon />} label="TIPS" />
        </Tabs>
        <CardContent className={ classes.content }>
          {this.state.tab === 0 &&
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Rating
                fractions={ 2 }
                initialRating={ 'rating' in this.state.editedPlace ? this.state.editedPlace.rating : place.rating }
                emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
                fullSymbol={<Star style={{ color: '#1976d2' }}/>}
                onChange={(value) => this.handleChange('rating', value)}
              />
              <TextField
                label='Comment'
                defaultValue={ place.comment }
                onChange={ (e) => this.handleChange('comment', e.target.value) }
                multiline
              />
            </div>
          }
          {this.state.tab === 1 &&
            <TextField
              label='Tip'
              defaultValue={ place.tip }
              onChange={(e) => this.handleChange('tip', e.target.value)}
              multiline
            />
          }
        </CardContent>
        <CardActions>
          <Button onClick={ this.onSave } variant='raised' size='small' color='secondary'>
            Save
          </Button>
        </CardActions>
      </Fragment>

    )
  }
}

export default withStyles(styles)(InfoCardEdit)
