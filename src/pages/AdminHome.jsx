import React, { Component, Fragment } from 'react';
import axios from "axios";
import JobUI from "../components/JobUI"
import AdminAppBar from "../components/AdminAppbar"

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
var auth = localStorage.getItem('adminAuthToken')
        var config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'x-auth-token': auth
              }
           };

class Home extends Component {
    state = {
        jobPosts: [],
        error: '',
        role: '',
        company: '',
        description:'',
        preferredSkills: '',
        salary: '',
        open: false
     }

    componentDidMount(){
        axios.get('https://recruitr-gautam.herokuapp.com/api/jobs/admin', config)
        .then(result =>{
            this.setState({jobPosts: result.data})
        })
        .catch((err)=>{
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
        role: '',
        company: '',
        description:'',
        preferredSkills: '',
        salary: ''
    })
      };

      handleSubmit =() =>{
        var newJob ={
            role: this.state.role,
            company: this.state.company,
            description: this.state.description,
            preferredSkills: this.state.preferredSkills,
            salary: this.state.salary
        };

            axios.post('https://recruitr-gautam.herokuapp.com/api/jobs', newJob, config)
        .then(result=>{
            if(result.data.error){
                this.setState({error: result.data.error})
            } else {
                this.setState({error: ''});
                this.handleClose();
                this.componentDidMount();
            }
        })  
        .catch(err =>{
            console.log(err)
        });
      }

      handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    deleteJob = (id) =>{
        axios.delete(`https://recruitr-gautam.herokuapp.com/api/jobs/admin/${id}`, config)
        .then(result=>{
            this.setState({jobPosts: result.data})
        })
        .catch(err =>{
            console.log(err)
        });
        this.componentDidMount();
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
                <JobUI job={job} key={job.jobId} deleteJob={this.deleteJob}/>
                )
            
        )
        return (
            <Fragment>
                <AdminAppBar history={history}/>
            <Grid container>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                <Button color="primary" variant="contained" onClick={this.handleOpen} 
                            className={classes.button}>New Job Post</Button>
                    {jobDisplay}
                </Grid>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
            </Grid>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="role" 
            name="role" 
            type="text" 
            label="Role" 
            className={classes.textField}
            value={this.state.role}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="comapny" 
            name="company" 
            type="text" 
            label="Company" 
            className={classes.textField}
            value={this.state.company}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="description" 
            name="description" 
            type="text" 
            label="Description" 
            className={classes.textField}
            value={this.state.description}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="preferredSkills" 
            name="preferredSkills" 
            type="text" 
            label="Preferred Skills" 
            className={classes.textField}
            value={this.state.preferredSkills}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="salary" 
            name="salary" 
            type="text" 
            label="Salary" 
            className={classes.textField}
            value={this.state.salary}
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
 
export default withStyles(styles)(Home);