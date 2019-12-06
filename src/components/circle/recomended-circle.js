import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';



const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    cardHeader:{
        fontSize: 16,
        fontWeight: 'bold'
    }
});

class RecomendedCircle extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader
                title={
                    <Typography className={classes.cardHeader}>Expand Your Circle</Typography>
                }
                action={
                    <IconButton aria-label="refresh">
                        <RefreshIcon />
                    </IconButton>
                }>
                </CardHeader>

                <CardContent>
                    <List className={classes.root} dense>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="@user" secondary="2k followers"></ListItemText>
                            <ListItemSecondaryAction>
                                <Button variant="contained"  color="primary">Connect</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="@user" secondary="2k followers"></ListItemText>
                            <ListItemSecondaryAction>
                                <Button variant="contained"  color="primary">Connect</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(RecomendedCircle);