const HOME = "/";
const SEARCH = "/search";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

const VIDEO = "/video";
const VIDEOUPLOAD = "/upload";
const VIDEODETAIL = "/:id";

const USER = "/user";
const USERDETAIL = "/:id/profile";
const USEREDIT = "/:id/profile/edit";
const USERCHANGEPASSWORD = "/change-password";
const ME = "/me";

const routes = {
  home: HOME,
  search: SEARCH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
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
  userEdit: (id) => {
    if (id) {
      return `/user/${id}/profile/edit`;
    } else {
      return USEREDIT;
    }
  },
  userChangePassword: USERCHANGEPASSWORD,
};

export default routes;
