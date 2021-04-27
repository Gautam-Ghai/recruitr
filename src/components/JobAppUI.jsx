import React, { Component } from 'react';

//Material-UI
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card:{
        marginTop: 20
    }
}

class JobAppUI extends Component {
    state = {  }
    render() { 
        const {classes,
        app:{firstName, lastName, email, phoneNumber, experience, projects}} = this.props;
        const ShowApps = !this.props.app ? (
            <p>No application to show</p>
        ) : (
            <Card className={classes.card}>
            <CardHeader 
                title={<Typography color="primary">{firstName} {lastName}</Typography>} 
                subheader={<Typography><a href={`mailto:${email}`}>{email}</a> | {phoneNumber}</Typography>}
            />
                <CardContent>
                    <Typography variant="body2" ><b>Experience</b>: {experience}</Typography>
                    <br />
                    <Typography variant="body2" ><b>Projects</b>: {projects}</Typography>
                </CardContent>
        </Card>
        )
        return (
        <div>
            {ShowApps}
        </div>
        );
    }
}
 
export default withStyles(styles)(JobAppUI);