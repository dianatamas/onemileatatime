import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dropzone from 'react-dropzone';
import ReactCropper from './Cropper';
import 'cropperjs/dist/cropper.css';

const styles = {

}

class ImageUploader extends Component {

  _crop = () => {
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  onImageDrop = (files) => {
    // Handle image upload here
    let uploadedFile = files[0]
    
  }

  render () {

    const { classes, open, onClose, img } = this.props

    return (
      <Dialog
        open={ open }
        onClose={ this.onClose }
        maxWidth={ 'md' }
      >
        <DialogTitle>Upload your image</DialogTitle>
        <DialogContent style={{ height: 900 }}>
          <Dropzone
            multiple={ false }
            accept="image/*"
            onDrop={ this.onImageDrop }>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
          <ReactCropper
            ref='cropper'
            src={ img }
            style={{ height: 400, width: '100%' }}
            guides={ false }
            aspectRatio={ 16 / 9 }
            crop={ this._crop }
          />
        </DialogContent>
      </Dialog>
    )
  }
}

export withStyles(styles)(ImageUploader)
