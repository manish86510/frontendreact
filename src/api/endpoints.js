// import base_uri from './base_url';
const endpoints = {
  // me: base_uri.base_uri + '/api/me/',
  // get_token: base_uri.base_uri + '/token/',
  get_token: 'https://energeapi.do.viewyoursite.net/api/token/refresh',
  profile_user: 'https://energeapi.do.viewyoursite.net/user/',
  profile_interest: 'https://energeapi.do.viewyoursite.net/user/interest/',
  profile_skills: 'https://energeapi.do.viewyoursite.net/user/skill/',
  profile_languages: 'https://energeapi.do.viewyoursite.net/user/language/',
  profile_social_links: 'https://energeapi.do.viewyoursite.net/user/social-link/',
  profile_education: 'https://energeapi.do.viewyoursite.net/user/education/',
  
  interest: 'https://energeapi.do.viewyoursite.net/interest/',
  skills: 'https://energeapi.do.viewyoursite.net/skill/',
  languages: 'https://energeapi.do.viewyoursite.net/language/',
  user_list: 'https://energeapi.do.viewyoursite.net/follower-user-list/',

  user_followers: 'https://energeapi.do.viewyoursite.net/user/follower/',
  user_comments: 'https://energeapi.do.viewyoursite.net/api/v1/post/comment/',
  user_like: 'https://energeapi.do.viewyoursite.net/api/v1/post/like/',

  create_post: 'https://energeapi.do.viewyoursite.net/api/v1/post/',
  create_media: 'https://energeapi.do.viewyoursite.net/api/v1/post/media/',
  get_post: 'https://energeapi.do.viewyoursite.net/api/v1/post/',

  recomended_followers: 'https://energeapi.do.viewyoursite.net/user/recommended/'
};
export default endpoints;
