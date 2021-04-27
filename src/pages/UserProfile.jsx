import React, { Component, Fragment } from 'react';
import UserAppBar from "../components/UserAppBar";
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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import CardHeader from '@material-ui/core/CardHeader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
      }
};

var auth = localStorage.getItem('userAuthToken')
        var config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'x-auth-token': auth
              }
           };

class UserProfile extends Component {
    state = {
        user: {},
        open: false,
        firstName: '',
        lastName: '',
        phoneNumber:'',
        address: '',
        error:''
    }

    componentDidMount(){
        axios.get('https://recruitr-gautam.herokuapp.com/api/user', config)
        .then(result=>{
            this.setState({user: result.data[0],
                            firstName: result.data[0].firstName,
                            lastName: result.data[0].lastName,
                            phoneNumber: result.data[0].phoneNumber,
                            address: result.data[0].address,
            })
        })  
        .catch(err =>{
            console.log(err)
        })
    }
    handleOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({
            open: false,
            error: '',
        })
      };

    handleSubmit =() =>{
        var editUser ={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        };

        if(this.state.firstName.length !==0 && this.state.lastName.length !== 0 && this.state.address.length !== 0 && this.state.phoneNumber.length !== 0){
            axios.put('https://recruitr-gautam.herokuapp.com/api/user', editUser, config)
        .then(result=>{
                this.setState({user: result.data[0],
                    firstName: result.data[0].firstName,
                    lastName: result.data[0].lastName,
                    address: result.data[0].address,
                    phoneNumber: result.data[0].phoneNumber})
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
        }else if (this.state.address.length === 0){
            this.setState({error: 'Address can not be empty'})
        }else if (this.state.phoneNumber.length === 0){
            this.setState({error: 'Phone Number can not be empty'})
        }
         else {
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
        const user = this.state.user;
        let error= this.state.error;
        return (
            <Fragment>
            <UserAppBar history={history}/>
            <Grid container>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                <Card className={classes.card}>
                <CardHeader
                 avatar={
                    <AccountCircleIcon />
                    }
                title={user.userName}
                />
                <CardContent>
                    <Typography variant="h4">{user.firstName}</Typography>
                    <Typography variant="h6" >{user.lastName}</Typography>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon className={classes.profileIcon}/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body1" >{user.email}</Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                        <PhoneIcon className={classes.profileIcon}/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body1" >{user.phoneNumber}</Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                        <LocationOnIcon className={classes.profileIcon}/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body1" >{user.address}</Typography>
                        </ListItemText>
                    </ListItem>
                    
                    
                    
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
           <TextField
            autoFocus
            id="address" 
            name="address" 
            type="text" 
            label="Address" 
            className={classes.textField}
            value={this.state.address}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
           <TextField
            autoFocus
            id="phoneNumber" 
            name="phoneNumber" 
            type="text" 
            label="Phone Number" 
            className={classes.textField}
            value={this.state.phoneNumber}
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
 
export default withStyles(styles)(UserProfile);