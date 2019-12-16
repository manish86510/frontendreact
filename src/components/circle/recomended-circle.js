import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import {Card, CardHeader, CardContent, Button, IconButton, Typography,
    List, ListItem, Divider, ListItemText, ListItemSecondaryAction, Avatar, ListItemAvatar,
    Grid, CardMedia
} from '@material-ui/core/';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';

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
    suggest_circle_paper:{
        padding:'15px',
      },
      suggest_name:{
        margin: '20px 0 0 0',
        fontSize: '18px'
      },
      avtar_followers:{
        height: '50px',
        width: '50px',
        borderRadius: '20px'
      },
});

class RecomendedCircle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recomendedCircle: null,
            text: 'Test',
            layoutType: props.layoutType,
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
                document.getElementById(user_id).disabled=true;
                document.getElementById(user_id).
                setAttribute(
                    "class",
                    "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary Mui-disabled Mui-disabled"
                );
            }
        });
    }

    listView = () =>{
        this.setState({layoutType: 'list'});
    }
    gridView = () =>{
        this.setState({layoutType: 'grid'});
    }

    render() {
        console.log(this.state.connectButtonStatus);
        const { classes } = this.props;
        const defaultStatus= false;
        return (
            <Card>
                <CardHeader
                title={
                    <Typography className={classes.cardHeader}>{this.props.customTitle ? this.props.customTitle : "Expand Your Circle" }</Typography>
                }
                action={
                    <div>
                    <IconButton aria-label="list" onClick={this.listView}>
                        <ListIcon />
                    </IconButton>
                    <IconButton aria-label="grid" onClick={this.gridView}>
                        <AppsIcon />
                    </IconButton>
                    <IconButton aria-label="refresh">
                        <RefreshIcon />
                    </IconButton>
                    </div>
                }>
                </CardHeader>

                <CardContent>
                {this.state.layoutType==='list'?
                    <List className={classes.root} dense>
                        {
                            (this.state.recomendedCircle != null && this.state.recomendedCircle != undefined) ? (
                                this.state.recomendedCircle.results.map((user, index) => (
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={user.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={"@" + user.username} secondary={user.followers_count + " followers"}></ListItemText>
                                        <ListItemSecondaryAction>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.connect.bind(this, user.pk)}
                                                id={user.pk}
                                                // disabled
                                            >
                                                connect
                                                
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            ) : undefined
                        }
                    </List>:
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container>
                            {
                            (this.state.recomendedCircle!=null && this.state.recomendedCircle!=undefined)?(
                                this.state.recomendedCircle.results.map((user, index)=>(
                                <Grid item xs={3} style={{margin:'10px 22px'}}> 
                                    <Card className={classes.suggest_circle_paper}>
                                        <Grid item xs={12}>
                                            <ListItemAvatar className={classes.avtar_followers}>
                                                <Avatar alt="Remy Sharp" src={user.avatar} />
                                            </ListItemAvatar>
                                        </Grid>
                                        <Grid item xs={12} style={{margin:'20px 0px'}}>
                                            <ListItemText primary={"@"+user.username} secondary={user.followers_count+" followers"}></ListItemText>
                                        </Grid>
                                        <Grid item xs={12} style={{marginBottom:'20px'}}>
                                            <Button variant="contained" color="primary" onClick={this.connect.bind(this, user.pk)} id={user.pk}>Connect</Button>
                                        </Grid>
                                    </Card>
                                </Grid>))        
                                ):undefined
                            }
                            </Grid>
                        </Grid>
                    </Grid> 
                    }
                </CardContent>
            </Card>
        );
    }
}
RecomendedCircle.defaultProps = {
    layoutType: 'list'
};
RecomendedCircle.propTypes = {
    layoutType: PropTypes.string,
    customTitle: PropTypes.string,
};

export default withStyles(styles)(RecomendedCircle);