// import base_uri from './base_url';

const base_uri = {
  base_uri : 'https://energeapi.do.viewyoursite.net',
}
const endpoints = {
  // me: base_uri.base_uri + '/api/me/',
  // get_token: base_uri.base_uri + '/token/',
  get_token: base_uri.base_uri + '/api/token/refresh',
  TOKEN: base_uri.base_uri + '/api/token/',
  profile_user: base_uri.base_uri + '/user/me/',
  profile_interest: base_uri.base_uri +'/user/interest/',
  profile_skills: base_uri.base_uri + '/user/skill/',
  profile_languages: base_uri.base_uri +'/user/language/',
  profile_social_links: base_uri.base_uri + '/user/social-link/',
  profile_education: base_uri.base_uri + '/user/education/',
  PROFILE: base_uri.base_uri + '/user/me/',
  PROFILE_UPDATE: base_uri.base_uri + '/user/profile-update',

  interest: base_uri.base_uri + '/user/interest/',
  skills: base_uri.base_uri + '/user/skill/',
  languages: base_uri.base_uri +'/user/language/',
  user_list: base_uri.base_uri +'/follower-user-list/',

  follow: base_uri.base_uri +'/user/follower/',
  post_comments: base_uri.base_uri +'/api/v1/post/comment/',
  user_like: base_uri.base_uri +'/api/v1/post/like/',

  my_interest:base_uri.base_uri +'/user/my-interest/',
  my_languages:base_uri.base_uri +'/user/my-language/',
  my_skills:base_uri.base_uri +'/user/my-skill/',

  create_post: base_uri.base_uri +'/api/v1/post/',
  POST: base_uri.base_uri +'/api/v1/post/',
  create_media: base_uri.base_uri +'/api/v1/post/media/',
  get_post: base_uri.base_uri +'/api/v1/post/',
  HOT_topic: base_uri.base_uri +'/api/v1/post/hot-topic/',
  recomended_followers: base_uri.base_uri +'/user/recommended/',
  friends_list: base_uri.base_uri +'/user/friends-list/',
};


export default endpoints;
