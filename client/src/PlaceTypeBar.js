import React, { Fragment, Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import randomColor from 'randomcolor'

const styles = {
  bar: {
    height: '3vh',
  },
  legend: {
    width: 10,
    height: 10,
    flexShrink: 0
  }
}

class PlaceTypeBar extends Component {

  generateColor () {
      return '#' +  Math.random().toString(16).substr(-6);
  }

  render () {
    const { classes, places } = this.props

    let data = {}
    let colors = {}
    for (let place of places) {
      if(place.type in data) {
        data[place.type] += 1
      } else {
        data[place.type] = 1
        colors[place.type] = randomColor()
      }
    }
    console.log(data)
    const total = places.length

    return (
      <div>
        <div style={{ display: 'flex', marginBottom: 30 }}>
        {
          Object.keys(data).map(key =>
            <Tooltip title={key + ': ' + data[key] + ' places'}>
              <div className={ classes.bar } style={{ backgroundColor: colors[key], flexGrow: data[key] / total }}></div>
            </Tooltip>
          )
        }
        </div>

        <div style={{ display: 'flex', marginBottom: 30, justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          {
            Object.keys(data).map(key =>
              <Fragment>
                <div className={ classes.legend } style={{ backgroundColor: colors[key] }}></div>
                <Typography>{key}</Typography>
              </Fragment>
            )
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PlaceTypeBar)
