import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/styles';
import endpoints from '../../api/endpoints';
import YoutubePlayer from './../feed/youtube-player';
import axios from 'axios';


const styles = theme => ({
    card: {
        maxWidth: 345,
      },
      media: {
        height: 220,
      },
    cardHeader:{
        fontSize: 16,
        fontWeight: 'bold'
    }
});

class HotTopic extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isError: '',
            postData: null 
        };
    }

     componentDidMount() {
        var url = endpoints.HOT_topic;
        var getToken = localStorage.getItem('access');
        axios.get(url,
            {
                headers: {Authorization: 'Bearer ' + getToken}
            }).then(res => {
                    this.setState({
                        postData: JSON.stringify(res.data.about_post)
                    });
            }).catch(res => {
                this.setState({
                    isError: "Data not found!"
                });
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader title={
                    <Typography className={classes.cardHeader}>Hot Topics</Typography>
                }
                action={
                    <IconButton aria-label="settings">
                        <RefreshIcon />
                    </IconButton>
                }>
                </CardHeader>
                {/* {
                    (this.state.postList.about_post.length>0)?(
                            <p>working</p>
                    ):(
                        <CardMedia className={classes.media} image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" />
                    )
                } */}

                <CardMedia className={classes.media} image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" />
                <CardContent>         
                    <Typography variant="body2" color="textSecondary" component="p">
                        This is my new post.
                    </Typography>
                </CardContent>
                {/* <p>{(this.state.postData.about_post!=null)?("working"):undefined}</p>    */}
            </Card>
        );
    }
}

export default withStyles(styles)(HotTopic);