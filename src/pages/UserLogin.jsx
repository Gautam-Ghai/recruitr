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

class UserLogin extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const userData= {
            email: this.state.email,
            password: this.state.password
        };
        
        axios.post('https://recruitr-gautam.herokuapp.com/api/auth/user', userData)
        .then(result =>{
            console.log(result.data)
            const { history } = this.props;
            if(result.data.token){
                localStorage.setItem('userAuthToken', result.data.token)
                history.push('/user/home');
            } else if(result.data.error){
                this.setState({error: result.data.error})
            }
            else {
                this.setState({error: "Invalid Username or Password"})
            }
        })
        .catch((err)=>{ 
                if(err){
                    this.setState({error: "Invalid Username or Password"})
                  }
        })
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
                    <Typography variant="h3" className={classes.pageTitle}>User Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
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
                                LogIn
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
                            <small>Don't have an account?<Link to={`/signup/user`}>SignUp</Link></small>
                    </form>
                    </div>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}
 
export default withStyles(styles)(UserLogin);