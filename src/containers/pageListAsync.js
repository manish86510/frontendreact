import Loadable from 'react-loadable';


export const Login = Loadable({
  loader: () => import('components/forms/Login'),
  loading: Loading,
});
