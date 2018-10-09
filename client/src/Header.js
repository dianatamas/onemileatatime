import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FlightIcon from '@material-ui/icons/Flight';

const styles = {
  grow: {
    flexGrow: 1,
    letterSpacing: 3
  },
  icons: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: 'inherit',
    textDecoration:'inherit',
  },
};

class Header extends Component {

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to='/' className={classes.link}>
            <FlightIcon className={classes.icons}/>
          </Link>
          <Link to='/' className={classes.link}>
            <Typography variant="headline" color="inherit" className={classes.grow}>
              Wanderlust
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header);
