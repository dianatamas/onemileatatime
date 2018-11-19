import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = {
  budgetBar: {
    height: '3vh',
  },
  legend: {
    width: '1vw',
    height: '2vh',
    flexShrink: 0
  }
}

class BudgetBar extends Component {

  render () {
    const { classes, housingBudget, transportBudget, otherBudget } = this.props
    const totalBudget = parseFloat(housingBudget) + parseFloat(transportBudget) + parseFloat(otherBudget)
    const housingFlexGrow = housingBudget / totalBudget
    const transportFlexGrow = transportBudget / totalBudget
    const otherFlexGrow = otherBudget / totalBudget

    return (
      <div>
        <div style={{ display: 'flex', marginBottom: 30 }}>
          <Tooltip title={'Housing Budget: ' + housingBudget + ' £'}>
            <div className={ classes.budgetBar } style={{ backgroundColor: '#1976d2', flexGrow: housingFlexGrow }}></div>
          </Tooltip>
          <Tooltip title={'Transport Budget: ' + transportBudget + ' £'}>
            <div className={ classes.budgetBar } style={{ backgroundColor: '#2196F3', flexGrow: transportFlexGrow }}></div>
          </Tooltip>
          <Tooltip title={'Other Budget: ' + otherBudget + ' £'}>
            <div className={ classes.budgetBar } style={{ backgroundColor: '#BBDEFB', flexGrow: otherFlexGrow }}></div>
          </Tooltip>
        </div>
        <div style={{ display: 'flex', marginBottom: 30, justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          <div className={ classes.legend } style={{ backgroundColor: '#1976d2' }}></div><Typography>Housing</Typography>
          <div className={ classes.legend } style={{ backgroundColor: '#2196F3' }}></div><Typography>Transport</Typography>
          <div className={ classes.legend } style={{ backgroundColor: '#BBDEFB' }}></div><Typography>Other</Typography>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(BudgetBar)
