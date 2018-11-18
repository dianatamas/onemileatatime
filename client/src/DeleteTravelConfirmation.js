import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

export default class DeleteTravelConfirmation extends Component {

  render () {
    const { open, title, onClose, onConfirmation } = this.props
    return (
      <Dialog
        open={ open }
        onClose={ onClose }
      >
        <DialogContent>
          <DialogContentText>{'Are you sure you want to delete your '+ title + ' travel?'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ onConfirmation } color='secondary'>Yes</Button>
          <Button onClick={ onClose } >Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }
}
