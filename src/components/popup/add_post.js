import React from "react";
import Popup from "reactjs-popup";
import TextArea from '../textarea';
import '../../styles/main.css';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PostTextArea from '../post_textarea';

class AddPost extends React.Component {
    render() {
    return (
    <div>
    <Popup trigger={<Grid container spacing={24}>
          <Grid item xs={12}>
              <TextArea/>
          </Grid>
      </Grid>} modal>
    {close => (
      <div className="modal" style={{display:'contents'}}>
        <a className="close" onClick={close}>
          &times;
        </a>
        <PostTextArea/>
      </div>
    )}
  </Popup>
  </div>
        );
    }
}
export default AddPost;