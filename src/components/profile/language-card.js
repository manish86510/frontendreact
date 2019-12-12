import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PropTypes } from 'prop-types';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    cardContainer: {
        padding: 10,
    },
    interest_heading: {
        fontSize: '20px',
        color: '#0f543ec7',
        fontWeight: '700'
    },
    interest_container: {
        padding: '10px',
    },
});


class LanguageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: [],
            isEditing: false,
        }
    }
    componentDidMount() {
        this.getMe();
        this.getInterest();
    }

    handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    getInterest = () => {
        var getToken = localStorage.getItem('access');
        axios.get(endpoints.interest, {
            headers: {
                Authorization: 'Bearer ' + getToken,
            }
        }).then(res => {
            this.setState({ language: res.data.results });
        }).catch(error => {
            console.log(error);
        });
    }

    getMe = () => {
        axios.get(endpoints.profile_interest, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.access,
            }
        }).then(res => {
            const profile_interest = this.state.profile_interest

            for (let i = 0; i < res.data.length; i++) {
                profile_interest.push(res.data[i].interest_code)
            }

            this.setState({ profile_interest: profile_interest })

        });
    }

    toggleEditing = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    renderInterestList = () => {
        return (
            this.state.language.map((interest, index) => (
                <Chip id="" label="" onDelete={this.handleDelete} variant="outlined" />
            ))
        );
    }

    renderInterstForm = () => {
        return (
            <div>Hello</div>
            
        )
    }




    render() {
        const { classes } = this.props;
        return (
            <div style={{ position: 'relative' }}>
                <div className={classes.interest_container}>
                    <label className={classes.interest_heading}>
                        Language
              </label>
                </div>
                <div className={classes.interest_container}>
                    <div>
                        {
                            this.state.isEditing ? this.renderInterstForm() : this.renderInterestList()
                        }
                    </div>
                    <div style={{ position: 'absolute', top: '50%', right: 0 }}>
                        <Icon onClick={this.toggleEditing} className="fa fa-plus-circle" style={{ fontSize: 30 }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LanguageCard);