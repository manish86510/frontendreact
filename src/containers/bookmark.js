import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextArea from '../components/textarea';
import Feed from '../components/feed/feed';
import BookmarkTab from '../components/bookmark-tab';
import Grid from '@material-ui/core/Grid';

class Bookmark extends React.Component{

    render() {
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="center" spacing={16}>
                    <BookmarkTab />
                </Grid>
            </div>
        );
    }
}

export default Bookmark;