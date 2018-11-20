import React, { Component, Fragment } from 'react'
import Rating from 'react-rating'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TravelSummaryCardEdit from './TravelSummaryCardEdit'
import BudgetBar from './BudgetBar'
import Divider from '@material-ui/core/Divider'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

const styles = {
  tagDone: {
    padding: '5px 8px 5px 8px',
    backgroundColor: '#34a83499',
    maxWidth: 'min-content',
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  media: {
    height: '25vh',
  },
  content: {
    paddingRight: 2,
    paddingLeft: 2
  },
  expansionDetails: {
    display: 'block'
  },
  expansionSummary: {
    minHeight: '6vh'
  },
  expansionPanel: {
    marginTop: 0
  }
}

const statuses = {
  0: 'Planned',
  1: 'Done'
}

class TravelSummaryCard extends Component {

  state = {
    showEditPane: false,
    expanded: null
  }

  handleExpansion = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  // Switch to Edit mode
  showEditPane = () => {
    this.setState({ showEditPane: true })
  }

  // Switch to Read-only mode
  closeEditPane = () => {
    this.setState({ showEditPane: false })
  }

  render () {
    const { classes, travel } = this.props
    const { showEditPane, expanded } = this.state
    const statusColor = parseInt(travel.status) === 1 ? '#34a83499' : '#ef8808b5'

    return (
      <Fragment>
        <Card style={{ height: '100%' }} elevation={ 0 } square>
          {!showEditPane &&
            <Fragment>
              <CardMedia
                className={classes.media}
                image={ travel.image }
              />
              <div style={{ height: 10, backgroundColor: statusColor }}></div>
            </Fragment>
          }
          <CardContent classes={{ root: classes.content }}>
            {showEditPane &&
              <TravelSummaryCardEdit
                travel={ this.props.travel }
                updateTravel={ this.props.updateTravel }
                closeEditPane={ this.closeEditPane }
              />
            }
            {!showEditPane &&
              <Fragment>
                <Grid container alignItems={ 'center' } style={{ marginBottom:10 }}>

                  <Grid item style={{ flexGrow: 1 }}>
                    <Typography variant='title' style={{ marginLeft: 12, fontWeight: 500 }} >
                      { travel.title.toUpperCase() }
                    </Typography>
                  </Grid>

                  <Grid item>
                    <IconButton
                      onClick={ this.showEditPane }
                      color="secondary"
                      aria-label="Edit Travel"
                    >
                      <EditIcon fontSize='small'/>
                    </IconButton>
                    <IconButton
                      onClick={ () => this.props.deleteTravel(travel._id) }
                      color="secondary"
                      aria-label="Delete Travel"
                    >
                      <DeleteIcon fontSize='small'/>
                    </IconButton>
                    <IconButton
                      onClick={ this.props.handleSidebar }
                      color="secondary"
                      aria-label="Collapse or expand sidebar"
                    >
                      <ArrowLeft fontSize='small'/>
                    </IconButton>
                  </Grid>
                </Grid>
                <ExpansionPanel classes={{ expanded: classes.expansionPanel }} elevation={0} expanded={expanded === 'panel1'} onChange={this.handleExpansion('panel1')}>
                  <ExpansionPanelSummary classes={{ root: classes.expansionSummary }} expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='subheading'>Description</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails classes={{ root: classes.expansionDetails }}>
                    <Rating
                      fractions={ 2 }
                      initialRating={ travel.rating }
                      emptySymbol={<StarBorder style={{ color: '#1976d2' }}/>}
                      fullSymbol={<Star style={{ color: '#1976d2' }}/>}
                      readonly
                    />
                    <Typography gutterBottom>{ travel.description }</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel classes={{ expanded: classes.expansionPanel }} elevation={0} expanded={expanded === 'panel2'} onChange={this.handleExpansion('panel2')}>
                  <ExpansionPanelSummary classes={{ root: classes.expansionSummary }} expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='subheading'>Travel Dates</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails classes={{ root: classes.expansionDetails }}>
                    <Typography>{ new Date(travel.startDate).toLocaleDateString() + ' - ' +
                    new Date(travel.endDate).toLocaleDateString()}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel classes={{ expanded: classes.expansionPanel }} elevation={0} expanded={expanded === 'panel3'} onChange={this.handleExpansion('panel3')}>
                  <ExpansionPanelSummary classes={{ root: classes.expansionSummary }} expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='subheading'>Travel Budget</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails classes={{ root: classes.expansionDetails }}>
                    <BudgetBar
                      housingBudget={ travel.housingBudget }
                      transportBudget={ travel.transportBudget }
                      otherBudget={ travel.otherBudget }
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel classes={{ expanded: classes.expansionPanel }} elevation={0} expanded={expanded === 'panel4'} onChange={this.handleExpansion('panel4')}>
                  <ExpansionPanelSummary classes={{ root: classes.expansionSummary }} expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='subheading'>Places</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails classes={{ root: classes.expansionDetails }}>
                    <Typography>You have visited {travel.places.length} places!</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

              </Fragment>
            }
          </CardContent>
        </Card>
      </Fragment>
    )
  }
}

export default withStyles(styles)(TravelSummaryCard)
