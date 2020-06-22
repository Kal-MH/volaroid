const HOME = "/";
const SEARCH = "/search";
const JOIN = "/join";
const LOGIN = "/login";

const VIDEO = "/video";
const VIDEOUPLOAD = "/upload";
const VIDEODETAIL = "/:id";

const USER = "/user";
const USERDETAIL = "/:id/profile";
const ME = "/me";

const routes = {
  home: HOME,
  search: SEARCH,
  join: JOIN,
  login: LOGIN,
  video: VIDEO,
  videoDetail: (id) => {
    if (id) {
      return `/video/${id}`;
    } else {
      return VIDEODETAIL;
    }
  },
  upload: VIDEOUPLOAD,
  user: USER,
  userDetail: (id) => {
    if (id) {
      return `/user/${id}/profile`;
    } else {
      return USERDETAIL;
    }
  },
  me: ME,
};

export default routes;
