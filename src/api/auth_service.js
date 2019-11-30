import endpoints from './endpoints';
import axios from 'axios';


export default function get_auth_token() {
  debugger;
  var refresh = localStorage.getItem('refresh');
        axios.get(endpoints.get_token,
            {refresh:refresh}
        ).then(res => {
          debugger;
            localStorage.setItem('access', res.data.access);
        }).catch(
            error => {
                console.log(error);
            });
}
