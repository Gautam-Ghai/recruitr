import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Material-UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const styles = {
    root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
      },
}

class UserAppBar extends Component {
    state = {  }

    handleClick = () => {
        localStorage.removeItem('userAuthToken');
        this.props.history.push('/')
    }
    
    render() { 

        const {classes} = this.props
        return (
            <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Recruitr | User Portal
          </Typography>
          <Button color="inherit" component={Link} to={`/user/home`}>Home</Button>
          <Button color="inherit" component={Link} to={`/user/profile`}>Profile</Button>
          <Button color="inherit" onClick={this.handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
        );
    }
}
 
export default withStyles(styles)(UserAppBar);