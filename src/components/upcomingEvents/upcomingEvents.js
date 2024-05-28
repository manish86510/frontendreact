import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    card: {
        maxWidth: 400,
        margin: 'auto'
    },
    media: {
        height: 140,
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    registerButton: {
        // color: 'white',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(9),
        marginRight: theme.spacing(2),
        width:'10rem',
        // marginLeft: '3.5rem'
    },
    dateBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(0),
        minWidth: '50px'
    },
    body:{
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    }
});

const UpcomingEventCard = ({ classes }) => {

    const eventData = {
        date: '17',
        month: 'May',
        title: 'How to Drive Digital Growth for Your Agri-Food Business',
        time: 'Friday, 17 May | 4:00 - 5:00 PM',
        speaker: 'Shubham',
        role: 'Director - ABC Ltd',
        image: 'https://picsum.photos/seed/picsum/690/388',
        registered: 119
    };

    return (
        <Card className={classes.card} style={{ margin: '25px 0' }} >
            <CardHeader title={
                    <Typography className={classes.cardHeader}>Upcoming Events</Typography>
                }  />
            <CardMedia
                className={classes.media}
                image={eventData.image}
                title={eventData.title}
            />
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={classes.dateBox}>
                        <Typography variant="h6">{eventData.date}</Typography>
                        <Typography variant="subtitle1">{eventData.month}</Typography>
                    </div>
                    <div className={classes.body}>
                        <Typography variant="body1" component="p">{eventData.title}</Typography>
                        <Typography variant="body2" color="textSecondary">{eventData.time}</Typography>
                        <Typography variant="body2" color="textSecondary">Speaker: {eventData.speaker}</Typography>
                        <Typography variant="body2" color="textSecondary">{eventData.role}</Typography>
                        <Typography variant="body2" color="textSecondary">Registered: {eventData.registered}</Typography>
                    </div>
                </div>
                <Button variant='contained' className={classes.registerButton}>
                    Register
                </Button>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(UpcomingEventCard);
