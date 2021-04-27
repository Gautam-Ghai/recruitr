import React, { Component, Fragment } from 'react';
import axios from "axios";
import UserJobUI from "../components/UserJobUI"
import UserAppBar from "../components/UserAppBar"

//Material-UI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = {
    
    button: {
        marginTop: 20,
      },
      textField: {
        margin: '10px auto 10px auto',
      },
      
      customError: {
        color: 'red',
        fontSize: '0.8rem'
      },
};
var auth = localStorage.getItem('userAuthToken')
        var config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'x-auth-token': auth
              }
           };

class UserHome extends Component {
    state = {
        jobPosts: [],
        error: '',
        open: false,
        selectedId: '',
        selectedRole: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        experience: '',
        projects: ''
     }

    componentDidMount(){
        axios.get('https://recruitr-gautam.herokuapp.com/api/jobs')
        .then(result =>{
            this.setState({jobPosts: result.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleOpen = (id, role) => {
        this.setState({
            open: true,
            selectedId: id,
            selectedRole: role
        });
      };

      handleClose = () => {
        this.setState({
            open: false,
            error: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            experience: '',
            projects: ''
    })
      };

      handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit =() =>{
        var newApp={
            firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        experience: this.state.experience,
        projects: this.state.projects
        }

            axios.post(`https://recruitr-gautam.herokuapp.com/api/app/${this.state.selectedId}`, newApp, config)
            .then(result=>{
                if(result.data.error){
                    this.setState({error: result.data.error})
                    console.log(result)
                } else{
                    this.handleClose()
                }
            })
            .catch(err =>{
                console.log(err)
            })
    }

    render() { 
        const jobs = this.state.jobPosts;
        const { history, classes } = this.props;
        let error= this.state.error;

        const jobDisplay = !jobs ? (
            <div>
                <p>No job to display!</p>
            </div>
        ): (
            jobs.map(job =>
                <UserJobUI job={job} key={job.jobId} handleOpen={this.handleOpen}/>
                )
            
        )
        return (
            <Fragment>
                <UserAppBar history={history}/>
            <Grid container>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                    {jobDisplay}
                </Grid>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
            </Grid>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Apply for {this.state.selectedRole}</DialogTitle>
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
            id="email" 
            name="email" 
            type="text" 
            label="Email" 
            className={classes.textField}
            value={this.state.email}
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
          <TextField
            autoFocus
            id="experience" 
            name="experience" 
            type="text" 
            label="Experience" 
            className={classes.textField}
            value={this.state.experience}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="projects" 
            name="projects" 
            type="text" 
            label="Projects" 
            className={classes.textField}
            value={this.state.projects}
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
            Apply
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
 
export default withStyles(styles)(UserHome);