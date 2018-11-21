import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Rating from 'react-rating'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import LoupeIcon from '@material-ui/icons/Loupe'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoCardEdit from './InfoCardEdit'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#1976d2',
    },
  },
})

const styles = {
  card: {
  },
  content: {
    height: 120
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}

class InfoCard extends React.Component {

  state = {
    showEditPane: false,
    tab: 0,
  }

  // Switch to Edit mode
  showEditPane = () => {
    this.setState({ showEditPane: true })
  }

  // Switch to Read-only mode
  closeEditPane = () => {
    this.setState({ showEditPane: false })
  }

  handleTabChange = (event, tab) => {
    this.setState({ tab });
  };

  render () {
    const { classes, place } = this.props
    const { showEditPane } = this.state

    return (
      <MuiThemeProvider theme={ theme }>
      <div>
        <Card className={classes.card}>
            {showEditPane ?
              <InfoCardEdit
                place={ place }
                updatePlace={ this.props.updatePlace }
              />
              :
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

                <CardContent className={classes.content}>
                  {this.state.tab === 0 &&
                    <Fragment>
                      <Rating
                        fractions={ 2 }
                        initialRating={ place.rating }
                        emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
                        fullSymbol={<Star style={{ color: '#1976d2' }}/>}
                        readonly
                      />
                      <Typography gutterBottom>
                        {place.comment}
                      </Typography>
                    </Fragment>
                    }
                  {this.state.tab === 1 &&
                    <Typography gutterBottom>
                      {place.tip}
                    </Typography>
                  }
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={ this.showEditPane }
                    color="secondary"
                    aria-label="Edit Place"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="Delete Place"
                    onClick={ () => this.props.deletePlace(place._id) }
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Fragment>
            }
        </Card>
      </div>
      </MuiThemeProvider>
    )
  }

}


export default withStyles(styles)(InfoCard);
