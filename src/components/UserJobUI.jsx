import React, { Component } from 'react';

//Material-UI
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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

    handleOpen = (jobId, role) => {
            this.props.handleOpen(jobId, role);
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
                    />
                        <CardContent>
                            <Typography variant="h4">{company}</Typography>
                            <Typography variant="h6" ><b>Description</b>: {description}</Typography>
                            <Typography variant="body1" ><b>Preffered Skills</b>: {preferredSkills}</Typography>
                        </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.handleOpen(jobId, role)}>Apply</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
 
export default withStyles(styles)(JobUI);