// import base_uri from './base_url';
const endpoints = {
  // me: base_uri.base_uri + '/api/me/',
  // get_token: base_uri.base_uri + '/token/',
  get_token: 'https://energeapi.do.viewyoursite.net/api/token/refresh',
  TOKEN: 'https://energeapi.do.viewyoursite.net/api/token/',
  profile_user: 'https://energeapi.do.viewyoursite.net/user/me/',
  profile_interest: 'https://energeapi.do.viewyoursite.net/user/interest/',
  profile_skills: 'https://energeapi.do.viewyoursite.net/user/skill/',
  profile_languages: 'https://energeapi.do.viewyoursite.net/user/language/',
  profile_social_links: 'https://energeapi.do.viewyoursite.net/user/social-link/',
  profile_education: 'https://energeapi.do.viewyoursite.net/user/education/',
  PROFILE: 'https://energeapi.do.viewyoursite.net/user/me/',
  PROFILE_UPDATE: 'https://energeapi.do.viewyoursite.net/user/profile-update',
  
  interest: 'https://energeapi.do.viewyoursite.net/user/interest/',
  skills: 'https://energeapi.do.viewyoursite.net/user/skill/',
  languages: 'https://energeapi.do.viewyoursite.net/user/language/',
  user_list: 'https://energeapi.do.viewyoursite.net/follower-user-list/',

  follow: 'https://energeapi.do.viewyoursite.net/user/follower/',
  post_comments: 'https://energeapi.do.viewyoursite.net/api/v1/post/comment/',
  user_like: 'https://energeapi.do.viewyoursite.net/api/v1/post/like/',

  my_interest:'https://energeapi.do.viewyoursite.net/user/my-interest/',
  my_languages:'https://energeapi.do.viewyoursite.net/user/my-language/',
  my_skills:'https://energeapi.do.viewyoursite.net/user/my-skill/',

  create_post: 'https://energeapi.do.viewyoursite.net/api/v1/post/',
  POST: 'https://energeapi.do.viewyoursite.net/api/v1/post/',
  create_media: 'https://energeapi.do.viewyoursite.net/api/v1/post/media/',
  get_post: 'https://energeapi.do.viewyoursite.net/api/v1/post/',
  HOT_topic: 'https://energeapi.do.viewyoursite.net/api/v1/post/hot-topic/',
  recomended_followers: 'https://energeapi.do.viewyoursite.net/user/recommended/'
};
export default endpoints;
