import endpointApi from './endpoints';
import axios from 'axios';

export default function get_auth_token(data) {
  return axios.post(endpointApi.get_token, data);
}
