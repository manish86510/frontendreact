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
            postList: null 
        };
    }

     componentDidMount() {
        var url = endpoints.HOT_topic;
        var getToken = localStorage.getItem('access');
        axios.get(url,
            {
                headers: {Authorization: 'Bearer ' + getToken}
            }).then(res => {
                var data = this.state.postList;
                if(data!=null){
                    for(var i=0;i<res.data.results.length;i++){
                        data.results.push(res.data.results[i]);
                    }

                    data.count = data.count + res.data.count;
                    data.next = res.data.next;
                    data.previous = res.data.previous;
                    
                    this.setState({
                        postList: data,
                    });
                }
                else{
                    this.setState({
                        postList: res.data,
                    });   
                }
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
                        kjsdfuhs fdsg dfg dfg d ghd fdfgdf
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(HotTopic);