import React, { Component, Fragment } from 'react';
import axios from "axios";
import JobAppUI from "../components/JobAppUI"
import AdminAppBar from "../components/AdminAppbar";

//Material-UI
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card:{
        marginTop: 20
    }
}

class JobDialog extends Component {
    state = {
        job: {},
        applications:[]
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        const jobId = params.jobId;
        var auth = localStorage.getItem('adminAuthToken')
        var config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'x-auth-token': auth
              }
           };

        axios.get(`https://recruitr-gautam.herokuapp.com/api/jobs/admin/${jobId}`, config)
        .then(result =>{
            console.log(result)
            this.setState({job: result.data.job})
            this.setState({applications: result.data.applications})
        })
        .catch(err=>{
            console.log(err.code)
        })
    }
    render() {
        const {classes, history} = this.props;
        const jobs = this.state.job;
        const apps = this.state.applications;
        const jobPost = !jobs ? (
            <p>No job to show</p>
        ):( 
        <Card className={classes.card}>
            <CardHeader 
                title={<Typography color="primary">{jobs.role}</Typography>} 
                subheader={jobs.salary}
            />
                <CardContent>
                    <Typography variant="h4">{jobs.company}</Typography>
                    <Typography variant="h6" ><b>Description</b>: {jobs.description}</Typography>
                    <Typography variant="body1" ><b>Preferred Skills</b>: {jobs.preferredSkills}</Typography>
                </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        );

        const AppPost = apps ? (
            apps.map(app => <JobAppUI key={app.appId} app={app} />)
        ) : (
            <p>No application to show</p>
        )
        return (
            <Fragment>
                <AdminAppBar history={history}/>
                <Grid container>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                {jobPost}
                <br />
                <b>Applications:</b>
                {AppPost}
                </Grid>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
            </Grid>
            </Fragment>
            
        );
    }
}
 
export default withStyles(styles)(JobDialog);