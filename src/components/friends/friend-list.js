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
import axios from 'axios';
import endpoints from '../../api/endpoints';
import { withRouter } from 'react-router-dom';


const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

class FriendsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: 'Test',
            friendList: null,
        };
    }

    componentDidMount() {
        var url = endpoints.friends_list;
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
                this.setState({ friendList: res.data.results });
            }
        });
    }

    handleFriendListClick = (friendInfo) => {
        this.props.history.push({
            pathname: "/profile/" + friendInfo.pk + "/",
            state: { friendInfo }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader
                    title={
                        <Typography className={classes.cardHeader}>Friends List</Typography>
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
                            (this.state.friendList != null && this.state.friendList.length!=undefined && this.state.friendList.length!=0) ? (
                                this.state.friendList.map((user, index) => (
                                    <ListItem
                                        button
                                        alignItems="flex-start"
                                        onClick={this.handleFriendListClick.bind(this, user.follower)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={user.follower.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={"@" + user.follower.username} secondary={user.follower.followers_count + " followers"}></ListItemText>
                                    </ListItem>
                                ))
                            ) :
                            <ListItem>
                                <ListItemText primary={"Data Not Found"}></ListItemText>
                            </ListItem>
                        }
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(withStyles(styles)(FriendsList));
