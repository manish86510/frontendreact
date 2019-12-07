import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { PropTypes } from 'prop-types';
import Button from '@material-ui/core/Button';


class FeedDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open_drawer: props.open_drawer
        };
    }

    closeDrawer = ()=>{
        this.setState({open_drawer: false});
        this.props.onDrawerClose();
    }

    render(){
        const { classes, post } = this.props;
        return (
            <Drawer anchor="right" open={this.state.open_drawer} className={"post-detail"}>
                <Button color="primary" onClick={this.closeDrawer}>Close</Button>
                <div>{post.about_post.replace(/(?:\r\n|\r|\n)/g, '<br />')}</div>
            </Drawer>
        )
    }
}

FeedDetail.propTypes = {
    post: PropTypes.object.isRequired,
    open_drawer: PropTypes.bool.isRequired,
    onDrawerClose: PropTypes.func.isRequired
};

export default FeedDetail;