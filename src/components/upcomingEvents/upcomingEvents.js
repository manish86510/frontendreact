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
        objectFit:"contain"
    },
    cardHeader: {
        fontSize: 16,
        // fontWeight: 'bold',
        fontFamily:"Daikon-Bold"
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
        
    },
    event:{
        fontFamily:"Daikon-Regular"
    },
    eventTitle:{
        fontFamily:"Daikon-Bold"
    }
});

const UpcomingEventCard = ({ classes }) => {

    const eventData = [
        {
            date: '17',
            month: 'May',
            title: 'How to Drive Digital Growth for Your Agri-Food Business',
            time: 'Friday, 17 May | 4:00 - 5:00 PM',
            speaker: 'Shubham',
            role: 'Director - ABC Ltd',
            image: 'https://picsum.photos/seed/picsum/690/388',
            registered: 119
        },{
            date: '24',
            month: 'June',
            title: 'Title 1',
            time: 'Friday, 14 March | 4:00 - 5:00 PM',
            speaker: 'Bhuvi',
            role: 'Director - XYZ Ltd',
            image: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            registered: 251
        },
        {
            date: '4',
            month: 'Nov',
            title: 'Title 123',
            time: 'Friday, 17 December | 4:00 - 5:00 PM',
            speaker: 'Satya',
            role: 'Director - MNO Ltd',
            image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Random_pyramids.jpg',
            registered: 222
        },
        {
            date: '30',
            month: 'APR',
            title: 'Title 3',
            time: 'Friday, 31 Dec | 4:00 - 5:00 PM',
            speaker: 'Rahul',
            role: 'Director - EFG Ltd',
            image: 'https://media.contentapi.ea.com/content/dam/eacom/lost-in-random/images/2021/06/lost-in-random-feature-image-16x9.jpg.adapt.crop191x100.1200w.jpg',
            registered: 250
        }
    ];

    return (
        <>
        {eventData.map((eventData)=><Card className={classes.card} style={{ margin: '25px 0' }} >
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
                    <Typography variant="body1" className={classes.eventTitle} component="p">{eventData.title}</Typography>
                    <Typography variant="body2" className={classes.event} color="textSecondary">{eventData.time}</Typography>
                    <Typography variant="body2" className={classes.event} color="textSecondary">Speaker: {eventData.speaker}</Typography>
                    <Typography variant="body2" className={classes.event} color="textSecondary">{eventData.role}</Typography>
                    <Typography variant="body2" className={classes.event} color="textSecondary">Registered: {eventData.registered}</Typography>
                </div>
            </div>
            <Button variant='contained' color="primary" className={classes.registerButton}>
                Register Here
            </Button>
        </CardContent>
    </Card>)}
    </>
    );
};

export default withStyles(styles)(UpcomingEventCard);
