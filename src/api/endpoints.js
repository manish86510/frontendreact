// import base_uri from './base_url';
const endpoints = {
  // me: base_uri.base_uri + '/api/me/',
  // get_token: base_uri.base_uri + '/token/',
  get_token: 'https://energeapi.do.viewyoursite.net/api/token/refresh',
  profile_user: 'https://energeapi.do.viewyoursite.net/',
  profile_interest: 'https://energeapi.do.viewyoursite.net/user/interest/',
  profile_skills: 'https://energeapi.do.viewyoursite.net/user/skill/',
  profile_languages: 'https://energeapi.do.viewyoursite.net/user/language/',
  create_post: 'https://energeapi.do.viewyoursite.net/api/v1/post/',
  create_media: 'https://energeapi.do.viewyoursite.net/api/v1/post/media/',
  user_followers: 'https://energeapi.do.viewyoursite.net/user/follower/'
};
export default endpoints;
