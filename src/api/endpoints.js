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

  // Admin panel APIs and Client Panel
  GET_ALL_NEWS: base_uri + '/news/',
  ADD_NEWS: base_uri + '/news/',
  ADD_EVENTS: base_uri + '/events/',
  ADD_SCHEMES: base_uri + '/schemes/',
  GET_ALL_EVENTS: base_uri + '/events/',
  GET_ALL_SCHEMES: base_uri + '/schemes/',
  get_industry: base_uri + '/industry/',
  get_allCompany: base_uri + '/company/',
  post_company: base_uri + '/company/',
  COMPANY_VERIFY: base_uri + '/verify-company/',
  DELETE_NEWS: base_uri + '/api/delete_news',
  DELETE_EVENTS: base_uri + '/api/delete_events',
  DELETE_SCHEMES: base_uri + '/api/delete_scheme',
  UPDATE_NEWS: base_uri + '/update_news',
  post_company_apply: base_uri + '/apply/create/',
  post_industry: base_uri + '/industry/',
  GET_ALL_SERVICES: base_uri + '/services',
  post_services: base_uri + '/services/',
  GET_ALL_SUBSCRIPTIONS: base_uri + '/subscriptions/',
  GET_PLAN: base_uri + '/plan/',
  GET_USER_COMPANY: base_uri + '/my-company/',
  MY_WORK: base_uri + '/user/applied-forms/',
  ADD_APPLY: base_uri + '/apply/create/',
  GET_APPLY: base_uri + '/apply/list/',
  USER_APPLY_COMPANY: base_uri + '/api/user-applied-companies/',
  BUY_PLAN: base_uri + '/buy-plan/',
  GET_BOUGHT_PLAN: base_uri + '/user/plan/',

  // get id details 
  get_id_company: base_uri + '/company/',
  get_id_schemes: base_uri + '/schemes/',
  get_id_company_services: base_uri + '/services/',


  // New API
  // get_news: base_uri + '/api/news',
  // get_events : base_uri + '/api/events/',
};


export default endpoints;
