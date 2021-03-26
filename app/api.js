// export const baseUrl = 'https://api.churchee.app/api/v1';
// const baseUrl = 'http://192.168.8.151:3000/api';
export const webiste = 'https://api.churchee.app';
export const chatService =
  'http://ec2-18-218-125-237.us-east-2.compute.amazonaws.com:8080';
const baseUrl = 'http://localhost:9090/api/v1';


export const api = {
  createAccount: baseUrl + '/user/member',
  login: baseUrl + '/auth/both',
  getMe: baseUrl + '/member/me',
  live: baseUrl + '/live/member',
  logout: baseUrl + '/auth/mobile/logout',
  changePassword: baseUrl + '/change-password',
  profile: baseUrl + '/profile',
  image: baseUrl + '/image',
  header: baseUrl + '/header/member',
  localImg: baseUrl + '/user/img/',
  img: 'https://dlvr7v2twt32x.cloudfront.net/',
  backups: baseUrl + '/backups',
  refreshToken: baseUrl + '/auth/refreshToken/mobile',
  createAcctMethod: baseUrl + '/user/member/source',
  emailExist: baseUrl + '/email',
  sermon: baseUrl + '/sermon/member',
  createAnonymousPR: baseUrl + '/pr/anonymous',
  createPR: baseUrl + '/pr',
  prayerView: baseUrl + '/pr/pray',
  personalPrayer: baseUrl + '/pr/personal',
  getPersonalPR: baseUrl + '/pr/personal',
  getPR: baseUrl + '/pr/member',
  getPRWall: baseUrl + '/pr/wall',
  getEvent: baseUrl + '/event/member',
  getDevotion: baseUrl + '/devotion/member',
  getHymn: baseUrl + '/hymn/member',
  note: baseUrl + '/note',
  bible: baseUrl + '/bible',
  bibleBook: baseUrl + '/bible/book',
  bibleChapter: baseUrl + '/bible/chapter',
  biblePassage: baseUrl + '/bible/passage',
  savedEvents: baseUrl + '/event/member/saved',
  media: baseUrl + '/media/member',
  form: baseUrl + '/form',
  newMember: baseUrl + '/newMember',
  volunteer: baseUrl + '/volunteer',
  childDedicaton: baseUrl + '/child/dedication',
  reset: baseUrl + '/mail/forgot',
  give: baseUrl + '/give/history',
  savedItem: baseUrl + '/member/savedItem',
  favouriteMedia: baseUrl + '/favourite/media',
  dailyVerse: baseUrl + '/dailyverse/member',
  country: baseUrl + '/country',
  church: baseUrl + '/user/find-church',
  getAllMembers: baseUrl + '/user/all/members',

  // room service
  createRoom: `${chatService}/api/v1/room/create`,
};