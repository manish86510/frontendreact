import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import { LinearProgress, Link } from '@material-ui/core';
import { blue, yellow } from '@material-ui/core/colors';
// import Link from '@material-ui/core/Link';


const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    link: {
        "&:hover": {
            color: "#0088db"
        },
    }
});

class RecomendedCircle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recomendedCircle: null,
            text: 'Test',
            connectButtonStatus: []
        };
    }

    componentDidMount() {
        var url = endpoints.recomended_followers;
        var getToken = localStorage.getItem('access');
        axios.get(
            url,
            {
                headers: {
                    Authorization: 'Bearer ' + getToken,
                }
            }
        ).then(res => {
            if (res.status == 200) {
                this.setState({ recomendedCircle: res.data });
            }
        });
    }

    connect = (user_id) => {
        var url = endpoints.follow;
        var getToken = localStorage.getItem('access');
        var data = {
            'follower': user_id
        };
        axios.post(
            url,
            data,
            {
                headers: {
                    Authorization: 'Bearer ' + getToken,
                }
            }
        ).then(res => {
            if (res.status == 200) {
                document.getElementById(user_id).innerHTML = "Request Sent";
                document.getElementById(user_id).disabled = true;
                document.getElementById(user_id).
                    setAttribute(
                        "class",
                        "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary Mui-disabled Mui-disabled"
                    );
            }
        });
    }
    handleRecommendedCircleClick = (userInfo) => {
        this.props.history.push({
            pathname: "/profile/" + userInfo.pk + "/",
            state: { userInfo }
        });
    }
    render() {
        console.log(this.state.connectButtonStatus);
        const { classes } = this.props;
        const defaultStatus = false;
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
                        {
                            (this.state.recomendedCircle != null && this.state.recomendedCircle != undefined) ? (
                                this.state.recomendedCircle.results.map((user, index) => (
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={user.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Link
                                                    variant="body2"
                                                    component="a"
                                                    underline="none"
                                                    onClick={this.handleRecommendedCircleClick.bind(this, user)}
                                                    className={classes.link}
                                                    color="textPrimary"
                                                >
                                                    {"@" + user.username}
                                                </Link>
                                            }
                                            secondary={
                                                user.followers_count + " followers"
                                            }>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.connect.bind(this, user.pk)}
                                                id={user.pk}
                                            >
                                                connect

                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            ) : undefined
                        }
                        {/* <ListItem alignItems="flex-start">
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
                        </ListItem> */}
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(withStyles(styles)(RecomendedCircle));