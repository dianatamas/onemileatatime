import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Dropzone from 'react-dropzone'

const styles = {

}

const CLOUDINARY_UPLOAD_PRESET = 'travelpictures';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dnfpgtxmr/upload';

class ImageUploader extends Component {

  state = {
    uploadedFileUrl: '',
    loading: false,
  }

  onImageDrop = (files) => {
    // Handle image upload here
    this.setState({ loading: true })
    let uploadedFile = files[0]
    var fd = new FormData()
    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    fd.append('file', uploadedFile)
    fetch(CLOUDINARY_UPLOAD_URL,
      {
        method: "POST",
        body: fd,
      }
    )
    .then(data => data.json())
    .then(data => {
      this.setState({ uploadedFileUrl: data.secure_url, loading: false})
      this.props.saveUrl(data.secure_url)
    })
  }

  render () {
    return (
      <Fragment>
        { this.state.loading && <LinearProgress color='secondary'/> }
        <div style={ {display: 'flex', flexDirection: 'column'} }>
          <Dropzone
            multiple={ false }
            style={ {height: 80, width: 130, margin: 10, border: '3px dotted black'} }
            accept="image/*"
            onDrop={ this.onImageDrop }>
            <p style={ {margin: 10} }>Drop an image or click to upload a file</p>
          </Dropzone>
          { this.state.uploadedFileUrl !== '' &&
            <img
              src={ this.state.uploadedFileUrl }
              alt=''
              height={ 180 }
              width={ 330 }
            />
          }
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(ImageUploader)
