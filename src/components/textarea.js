import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextareaAutosize, Avatar } from '@material-ui/core';
import '../styles/main.css';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';

const styles = theme => ({
    conButton: {
        float: "right",
    }
});

class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={"text-area-container"}>
                    <div className={'person-image'}>
                        <Avatar src={"https://media4.s-nbcnews.com/j/newscms/2019_25/2907176/190623-south-bend-shooting-pub-cs-1006a_a0b76f34c22ed225bcf4f4b9b607321b.fit-760w.jpg"} />
                    </div>
                    <TextareaAutosize aria-label="empty textarea" placeholder="Write something..." className={"post-text-area"} />
                    
                </div>
            </div>
        )
    }
}

TextArea.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(TextArea);