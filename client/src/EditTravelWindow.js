import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Rating from 'react-rating';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageUploader from './ImageUploader'

import DialogActions from '@material-ui/core/DialogActions';

export default class EditTravelWindow extends Component {

  state = {
    editedTravel: {}
  }

  handleChange = (field, value) => {
    let newField = {}
    newField[field] = value
    let editedTravel = Object.assign({}, this.state.editedTravel, newField)
    this.setState({editedTravel}, () => console.log(this.state.editedTravel))
  }

  onSave = () => {
    this.props.updateTravel(this.props.travel._id, this.state.editedTravel)
    this.props.onClose()
  }

  render () {
    const { open, onClose } = this.props
    return (
      <Dialog fullScreen open={open} onClose={onClose} onEscapeKeyDown={onClose}>
        <DialogTitle>Edit your travel</DialogTitle>
        <DialogContent>
          <Grid container spacing={32}>
            <Grid item md={6}>
            <TextField
              label='Title'
              onChange={(e) => this.handleChange('title', e.target.value)}
              variant={'outlined'}
              margin={'normal'}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label='Description'
              onChange={(e) => this.handleChange('description', e.target.value)}
              multiline
              rows={4}
              margin={'normal'}
              variant={'outlined'}
              rowsMax="4"
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Grid>
            <Grid item md={6}>
              <Typography>HEY</Typography>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSave} variant='raised' color='secondary'>Save</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }
}
