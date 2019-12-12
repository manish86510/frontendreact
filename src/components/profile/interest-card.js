import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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


class InterestCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interest: [],
            isEditing: false,
        }
    }
    componentDidMount() {
        this.getMe();
        this.getInterest();
    }

    handleDelete = () => {
        debugger;
        console.info('You clicked the delete icon.');
    };

    getInterest = () => {
        var getToken = localStorage.getItem('access');
        axios.get(endpoints.interest, {
            headers: {
                Authorization: 'Bearer ' + getToken,
            }
        }).then(res => {
            this.setState({ interest: res.data.results });
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

    searchInterestList = () => {
        debugger;
        
    }

    toggleEditing = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    renderInterestList = () => {
        return (
            <div>
                <div>
                    {this.state.interest.map((interest, index) => (
                        <Chip id={interest.id} label={interest.interest} onDelete={this.handleDelete} color="primary" variant="outlined" />
                    ))}
                </div>
                <div style={{ position: 'absolute', top: '50%', right: 0 }}>
                    <Icon onClick={this.toggleEditing} className="fa fa-plus-circle" style={{ fontSize: 30 }} />
                </div>
            </div>
        );
    }

    renderInterstForm = () => {
        return (
            <div>
                <div style={{ width: 900 }}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={this.state.interest}
                    getOptionLabel={option => option.title}
                    // defaultValue={[top100Films[13]]}
                    
                    renderInput={params => (
                    <TextField
                        {...params}
                        onChange={this.searchInterestList}
                        variant="standard"
                        placeholder="Interest"
                        fullWidth
                    />
                    )}
                />
                </div>
                <div style={{ position: 'absolute', top: '50%', right: 0 }}>
                    <Icon onClick={this.toggleEditing} className="fa fa-close" style={{ fontSize: 30 }} />
                </div>
            </div>

        )
    }




    render() {
        const { classes } = this.props;
        return (
            <div style={{ position: 'relative' }}>
                <div className={classes.interest_container}>
                    <label className={classes.interest_heading}>
                        Interests
              </label>
                </div>
                <div className={classes.interest_container}>
                    <div>
                        {
                            this.state.isEditing ? this.renderInterstForm() : this.renderInterestList()
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(InterestCard);