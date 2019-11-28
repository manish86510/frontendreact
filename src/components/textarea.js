import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextareaAutosize, Avatar, Paper } from '@material-ui/core';
import '../styles/main.css';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Box } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
const styles = theme => ({
    con: {
        width: "100%",

    },
    button: {
        marginRight: 8,
        float: "right",
    }
});


class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {
                about_post: "",
                tags: "test",
                is_public: true,
                post_type: "Post",
                target_audience: "test"
            }
        }
    }

    HandleTextArea = (e) => {
        console.log(e.target.value);
        this.state.postData.about_post = e.target.value;
        this.setState({
            postData: this.state.postData,
        });
    }

    handlePostCreate = () => {
        var postData = this.state.postData;
        var getToken = localStorage.getItem('access');
        // console.log("access :",JSON.parse(localStorage.getItem('access')).access);
        axios.post("https://energeapi.do.viewyoursite.net/api/v1/post/",
            postData,
            {
                headers: {
                    Authorization: 'Bearer ' + getToken,
                }
            }
        ).then(result => {
            if (result.status === 200) {
                console.log(result);
                               
            } else {
                this.setState({
                    isError: true
                });
            }
        }).catch(e => {
            this.setState({
                isError: true
            });
        });
        window.location.reload();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.Paper}>
                    <div className={"text-area-container"}>
                        <div className={'person-image'}>
                            <Avatar src={"https://media4.s-nbcnews.com/j/newscms/2019_25/2907176/190623-south-bend-shooting-pub-cs-1006a_a0b76f34c22ed225bcf4f4b9b607321b.fit-760w.jpg"} />
                        </div>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Write something..."
                            className={"post-text-area"}
                            onChange={this.HandleTextArea}
                        />
                    </div>
                    {/*<Box component="div" m={1} className={classes.con}>
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            className={classes.button}
                            onClick={this.handlePostCreate}>
                            Post
                        </Fab>
                    </Box>*/}
                </Paper>
            </div>
        )
    }
}

TextArea.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(TextArea);