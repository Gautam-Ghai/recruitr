import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Material-UI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card:{
        margin: 10,
        textAlign: 'center',
        minWidth: 400
    }
}

class HomePage extends Component {
    state = {  }
    render() { 
        const {classes} = this.props
        return (
        <Grid container>
            <Grid item md={2} sm={1}>
                    
            </Grid>
            <Grid item md={4} sm={5}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h1">Admin</Typography>
                </CardContent>
            <CardActions>
            <Button variant="contained"  color="primary" component={Link} to={`/login/admin`}>Sign In</Button>
            <Button variant="contained" color="secondary" component={Link} to={`/signup/admin`}>Sign Up</Button>
            </CardActions>
        </Card>
            </Grid>
            <Grid item md={4} sm={5}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h1">User</Typography>
                </CardContent>
            <CardActions>
            <Button variant="contained"  color="primary" component={Link} to={`/login/user`}>Sign In</Button>
            <Button variant="contained" color="secondary" component={Link} to={`/signup/user`}>Sign Up</Button>
            </CardActions>
            </Card>
            </Grid>
            <Grid item md={2} sm={1}>
                    
            </Grid>
        </Grid>
        );
    }
}
 
export default withStyles(styles)(HomePage);