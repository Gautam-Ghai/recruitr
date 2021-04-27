import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

//Material-UI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = {
    form: {
        textAlign: 'center',
        position: 'relative',
        width: '350px',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 3px 20px 0px rgba(0, 0, 0, 0.25)',
      },
      textField: {
        margin: '10px auto 10px auto',
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem'
      },
      button: {
        margin: 20,
      },
      progress: {
        position: 'absolute'
      }
}

class NewUser extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        firstName: '',
        lastName: '',
        userName: '',
        phoneNumber: '',
        address: '',
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const userData= {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        };

        if(this.state.firstName.length !==0 && this.state.lastName.length !== 0 && this.state.email.length !==0 && this.state.password.length !== 0){
            axios.post('https://recruitr-gautam.herokuapp.com/api/user', userData)
        .then(result =>{
            const { history } = this.props;
            if(result.data.token){
                localStorage.setItem('userAuthToken', result.data.token)
                history.push('/user/home');
            } else if(result.data.error){
                this.setState({error: result.data.error})
            }
             else {
                this.setState({error: "some error occured, try again!"})
            }
        })
        .catch((err)=>{ 
                if(err){
                    console.log(err)
                    this.setState({error: "Invalid Username or Password"})
                  }
        })
        } else if (this.state.firstName.length === 0){
            this.setState({error: 'First Name can not be empty'})
        }else if (this.state.lastName.length === 0){
            this.setState({error: 'Last Name can not be empty'})
        } else if (this.state.email.length === 0){
            this.setState({error: 'Email can not be empty'})
        }else if (this.state.password.length === 0){
            this.setState({error: 'Password can not be empty'})
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
        const {classes} = this.props;
        let error= this.state.error;
        return (
            <Grid container>
                <Grid item sm />
                <Grid item sm>
                    <div className={classes.form}>
                    <Typography variant="h3" className={classes.pageTitle}>User SignUp</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                            id="firstName" 
                            name="firstName" 
                            type="firstName" 
                            label="First Name" 
                            className={classes.textField}
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField 
                            id="lastName" 
                            name="lastName" 
                            type="lastName" 
                            label="LastName" 
                            className={classes.textField}
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField 
                            id="userName" 
                            name="userName" 
                            type="userName" 
                            label="UserName" 
                            className={classes.textField}
                            value={this.state.userName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            variant="outlined"
                            helperText="Must have atleast 8 characters with 1 Uppercase, 1 Lowecase, 1 Numeric and 1 Special Character"
                            fullWidth
                        />
                        <TextField 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            type="phoneNumber" 
                            label="Phone Number" 
                            className={classes.textField}
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField 
                            id="address" 
                            name="address" 
                            type="address" 
                            label="Address" 
                            className={classes.textField}
                            value={this.state.address}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        {error.length !== 0 ? (
                            <Typography variant="body2" className={classes.customError}>
                            {error}
                            </Typography>
                        ): ('')}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            >
                                Create Account
                            </Button>
                            <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            component={Link}
                            to={'/'}
                            >
                                Home
                            </Button>
                            <br />
                            <small>Already have an account? <Link to={`/login/user`}>Login</Link></small>
                    </form>
                    </div>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}
 
export default withStyles(styles)(NewUser);