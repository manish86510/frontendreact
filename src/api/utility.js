import './endpoints';
import axios from 'axios';

function getToken() {
    var refresh = localStorage.getItem('refresh');
    axios.post(endpoints.get_token,{
        refresh: refresh
    }).then(result => {
        if (result.status === 200) {
            localStorage.setItem('access', result.data.access);
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
}

function MyResult(api, mydata) {
    getToken();
    var getToken = localStorage.getItem('access');
    axios.post(api,
    mydata,
    {
        headers: {
            Authorization: 'Bearer ' + getToken,
        }
    }
    ).then(result => {
        return result;
    });
}
