import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Material-UI
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    card:{
        marginTop: 20
    },
    deleteIcon: {
            '&:hover': {
                color: 'red',
                cursor: 'pointer'
            }
    }
}
class JobUI extends Component {
    state = {  }

    deleteJob = (jobId, role) => {
        if(window.confirm(`Are you sure you want to delete this post: ${role}`)){
            this.props.deleteJob(jobId);
        }
    }
    render() { 
        const {classes,
        job: { jobId,
            role,
            company,
            description,
            preferredSkills,
            salary}} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader 
                        title={<Typography color="primary">{role}</Typography>} 
                        subheader={salary}
                        action={ <DeleteIcon onClick={() => this.deleteJob(jobId, role)} className={classes.deleteIcon}/>}
                    />
                    <CardActionArea component={Link} to={`/jobs/admin/${jobId}`}>
                        <CardContent>
                            <Typography variant="h4">{company}</Typography>
                            <Typography variant="h6" ><b>Description</b>: {description}</Typography>
                            <Typography variant="body1" ><b>Preffered Skills</b>: {preferredSkills}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}
 
export default withStyles(styles)(JobUI);