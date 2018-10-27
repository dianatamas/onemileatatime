import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';

const styles = {

}

const CLOUDINARY_UPLOAD_PRESET = 'travelpictures';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dnfpgtxmr/upload';

class ImageUploader extends Component {

  state = {
    uploadedFileUrl: '',
  }

  onImageDrop = (files) => {
    // Handle image upload here
    let uploadedFile = files[0]
    var fd = new FormData();
    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fd.append('file', uploadedFile);
    fetch(CLOUDINARY_UPLOAD_URL,
    {
          method: "POST",
          body: fd,
      })
      .then(data => data.json())
      .then(data => {
        this.setState({ uploadedFileUrl: data.secure_url});
        this.props.saveUrl(data.secure_url)
      })

  }

  render () {

    const { classes } = this.props

    return (
      <div style={{display: 'flex'}}>
        <Dropzone
          multiple={ false }
          style={{height: 150, width: 150, margin: 20}}
          accept="image/*"
          onDrop={ this.onImageDrop }>
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        {this.state.uploadedFileUrl !== '' &&
          <img
            src={this.state.uploadedFileUrl}
            height={180}
            width={330}
          />
        }
      </div>
    )
  }
}

export default withStyles(styles)(ImageUploader)
