// import base_uri from './base_url';

// const base_uri = 'https://energeapi.do.viewyoursite.net';
export const base_uri = 'http://103.251.94.87:8083'
const endpoints = {
  // me: base_uri + '/api/me/',
  // get_token: base_uri + '/token/',
  get_token: base_uri + '/api/token/refresh',
  TOKEN: base_uri + '/api/token/',
  profile_user: base_uri + '/user/me/',
  profile_interest: base_uri + '/user/interest/',
  profile_skills: base_uri + '/user/skill/',
  profile_languages: base_uri + '/user/language/',
  profile_social_links: base_uri + '/user/social-link/',
  profile_education: base_uri + '/user/education/',
  profile_update: base_uri + '/user/profile-update',

  interest: base_uri + '/user/interest/',
  skills: base_uri + '/user/skill/',
  languages: base_uri + '/user/language/',
  user_list: base_uri + '/follower-user-list/',

  follow: base_uri + '/user/follow/',
  follower: base_uri + '/user/follower/',
  following: base_uri + '/user/following/',
  post_comments: base_uri + '/api/v1/post/comment/',
  user_like: base_uri + '/api/v1/post/like/',

  my_interest: base_uri + '/user/my-interest/',
  my_languages: base_uri + '/user/my-language/',
  my_skills: base_uri + '/user/my-skill/',

  create_post: base_uri + '/api/v1/post/',
  POST: base_uri + '/api/v1/post/',
  create_media: base_uri + '/api/v1/post/media/',
  get_post: base_uri + '/api/v1/post/',
  HOT_topic: base_uri + '/api/v1/post/hot-topic/',
  recomended_followers: base_uri + '/user/recommended/',
  WORKPLACE: base_uri + '/user/workplace/',
  all_city: base_uri + '/user/city/',

  // Admin panel APIs
  GET_ALL_NEWS: base_uri + '/api/news',
  ADD_NEWS: base_uri + '/news/add/',
  ADD_EVENTS: base_uri + '/events/add/',
  ADD_SCHEMES: base_uri + '/scheme/add/',
  GET_ALL_EVENTS: base_uri + '/api/events/',
  GET_ALL_SCHEMES: base_uri + '/api/scheme/',

  // New API
  get_news: base_uri + '/api/news',
  get_industry: base_uri + '/api/industry/',
  get_company: base_uri + '/api/company/',
};


export default endpoints;
