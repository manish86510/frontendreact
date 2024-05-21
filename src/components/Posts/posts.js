import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import GridListTile from '@material-ui/core/GridListTile';
import { Avatar, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faComment, faShareAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../styles/main.css'
import endpoints from '../../api/endpoints';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  conButton: {
    float: "right",
  },
  gridList: {
    listStyleType: "none",
    width: '100%',
    borderRadius: 30
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  content: {
    position: "relative",
    width: "100%",
    top: -50,
    borderRadius: 15,
    paddingBottom: 24,
  },
});

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      value: 0,
      comments: ''

    };
    this.handleLike = this.handleLike.bind(this)
  }

  componentDidMount() {
    this.getAllPost();
  }

  getAllPost = () => {
    // var url = "https://energeapi.do.viewyoursite.net/api/v1/post/";
    var url = endpoints.POST;
    var getToken = localStorage.getItem('access');
    axios.get(
      url,
      {
        headers: {
          Authorization: 'Bearer ' + getToken,
        }
      }
    ).then(res => {
      if (res.status === 200) {
        console.log(res.data)
        this.setState({
          postList: res.data,
        });
      }
    })
  }

  handleLike = (tile) => {
    var my_data = {
      post: tile,
    }
    // var url = "https://energeapi.do.viewyoursite.net/api/v1/post/like/"
    var url = endpoints.user_like;
    var getToken = localStorage.getItem('access');
    axios.post(
      url, my_data,
      {
        headers: {
          Authorization: 'Bearer ' + getToken,
        }
      }
    ).then(res => {
      console.log(res.data)
      this.setState({
        bgColor: 'blue'
      })
    })
  }

  handleComment = () => { }

  render() {
    const { classes } = this.props;
    // var value = this.state.value;
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
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ border: 2, borderRadius: 2, width: '25%' }} />
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ border: 2, borderRadius: 2, width: '25%' }} />
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ border: 2, borderRadius: 2, width: '25%' }} />
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ border: 2, borderRadius: 2, width: '25%', opacity: 0.4 }} />
                    <div class="bottom-left">Manish Kumar</div>
                  </GridListTile >
                
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
                        <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#0066cc' }} />
                      </IconButton>
                      <span style={{ fontSize: 12 }}>{tile.like_count}</span>

                      <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" uaria-label="Close"
                        onClick={this.handleComment}>
                        <FontAwesomeIcon icon={faComment} />
                      </IconButton>
                      <span style={{ fontSize: 12 }}>{tile.comment_count}</span>

                      <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                        <FontAwesomeIcon icon={faShareAlt} />
                      </IconButton>
                      <span style={{ fontSize: 12 }}>{tile.share_count}</span>

                      {/* <TextareaAutosize aria-label="empty textarea" placeholder="Empty" /> */}                     
                    </div>
                    <h1>hello</h1>
                  </Paper> 
                  {/* <TextField
                        required
                        id="standard-required"
                        label="Comment"
                        defaultValue=""
                        className={classes.textField}
                        margin="normal"
                      />                 */}
                </div>                
              ))}
            </Grid>
          </div>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Posts);