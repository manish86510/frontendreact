import React from 'react';
import Paper from '@material-ui/core/Paper';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Button, Avatar, Grow, Divider, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShareAlt, faTag, faCoins, faUsers, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AddPost from '../popup/add_post';
import { Box } from '@material-ui/core';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  gridList: {
    listStyleType: "none",
    width: '100%',
    borderRadius: 30
  },
});

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      value: 0,

    };
    this.handleLike = this.handleLike.bind(this)
  }

  componentDidMount() {
    var url = "https://energeapi.do.viewyoursite.net/api/v1/post/";
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
        console.log(res.data)
        this.setState({
          postList: res.data,
        });
      }
    })
    // this.getPostList();
  }
  handleLike = (tile) => {
    var my_data={
      post:tile,
    }
    var url = "https://energeapi.do.viewyoursite.net/api/v1/post/like/"
    var getToken = localStorage.getItem('access');
    axios.post(
      url, my_data,
      {
        headers: {
          Authorization: 'Bearer ' + getToken,
        }
      }
    ).then(res => {
      debugger;
      console.log(res.data)
    })
  }

  render() {
    const { classes } = this.props;
    var value = this.state.value;
    // console.log(value);
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>

        </Grid>
        <Grid item xs={12}>
          <div>
            <Grid className={classes.gridList} style={{ borderRadius: 30 }}>
              {this.state.postList.map(tile => (
                <div>
                  <GridListTile key={tile.user} style={{ width: "100%", height: 300, borderRadius: 30 }}>
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ borderRadius: 30 }} />
                  </GridListTile>
                  <Paper className={classes.content}>
                    <ListItem>
                      <Avatar
                        src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                      </Avatar>

                      <span style={{ padding: 20 }}>
                        <div><b>Awosome Project</b></div>
                        <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                      </span>

                    </ListItem>

                    <div style={{ paddingLeft: '2%' }}>
                      {tile.about_post}
                    </div>

                    <div style={{ paddingLeft: '2%' }}>
                      <IconButton size='small' color="inherit"
                        onClick={this.handleLike.bind(this, tile.id)}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </IconButton>
                      <span style={{ fontSize: 12 }}>{tile.like_count}</span>

                      <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" uaria-label="Close">
                        <FontAwesomeIcon icon={faComment} />
                      </IconButton>
                      <span style={{ fontSize: 12 }}>{tile.comment_count}</span>

                      <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                        <FontAwesomeIcon icon={faShareAlt} />
                      </IconButton>
                      <span style={{ fontSize: 12 }}>{tile.share_count}</span>
                    </div>
                  </Paper>
                </div>
              ))}
            </Grid>
          </div>
        </Grid>
      </div>
    );
  }
}
Posts.propTypes = {
  children: PropTypes.node.isRequired,
};
export default withStyles(styles)(Posts);