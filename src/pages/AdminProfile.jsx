import React, { Component, Fragment } from 'react';
import AdminAppBar from "../components/AdminAppbar";
import axios from "axios";

//Material-UI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    card:{
        marginTop: 30
    },
    
    textField: {
        margin: '10px auto 10px auto',
      },
      
      customError: {
        color: 'red',
        fontSize: '0.8rem'
      },
};

var auth = localStorage.getItem('adminAuthToken')
        var config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'x-auth-token': auth
              }
           };

class AdminProfile extends Component {
    state = {
        admin: {},
        open: false,
        firstName: '',
        lastName: '',
        error:''
    }

    componentDidMount(){
        axios.get('https://recruitr-gautam.herokuapp.com/api/admin', config)
        .then(result=>{
            this.setState({admin: result.data[0],
                            firstName: result.data[0].firstName,
                            lastName: result.data[0].lastName})
        })  
        .catch(err =>{
            console.log(err)
        })
    }
    handleOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({open: false});
        this.setState({error: ''})
      };

    handleSubmit =() =>{
        var editUser ={
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        if(this.state.firstName.length !==0 && this.state.lastName.length !== 0){
            axios.put('https://recruitr-gautam.herokuapp.com/api/admin', editUser, config)
        .then(result=>{
            console.log(result.data)
                this.setState({admin: result.data[0],
                    firstName: result.data[0].firstName,
                    lastName: result.data[0].lastName})
        })  
        .catch(err =>{
            console.log(err)
        });

        this.handleClose();
        this.componentDidMount();
        } else if (this.state.firstName.length === 0){
            this.setState({error: 'First Name can not be empty'})
        }else if (this.state.lastName.length === 0){
            this.setState({error: 'Last Name can not be empty'})
        } else {
            this.setState({error: 'Some error occured!'})
        }
      }

      handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() { 
        const { history, classes } = this.props;
        const admin = this.state.admin;
        let error= this.state.error;
        return (
            <Fragment>
            <AdminAppBar history={history}/>
            <Grid container>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4">{admin.firstName}</Typography>
                    <Typography variant="h6" >{admin.lastName}</Typography>
                    <Typography variant="body1" >{admin.email}</Typography>
                </CardContent>
                <CardActions>
                    
                <Button color="primary" variant="contained" onClick={this.handleOpen}>Edit Details</Button>
                </CardActions>
                </Card>
                </Grid>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
            </Grid>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="firstName" 
            name="firstName" 
            type="text" 
            label="First Name" 
            className={classes.textField}
            value={this.state.firstName}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="lastName" 
            name="lastName" 
            type="text" 
            label="Last Name" 
            className={classes.textField}
            value={this.state.lastName}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          {error.length !== 0 ? (
                            <Typography variant="body2" className={classes.customError}>
                            {error}
                            </Typography>
                        ): ('')}
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleSubmit} color="primary">
            Save
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
            </Fragment>
        );
    }
}
 
export default withStyles(styles)(AdminProfile);