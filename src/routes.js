const HOME = "/";
const SEARCH = "/search";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

const VIDEO = "/video";
const VIDEOUPLOAD = "/upload";
const VIDEODELETE = "/:id/delete";
const VIDEODETAIL = "/:id";

const USER = "/user";
const USERDETAIL = "/:id/profile";
const USEREDIT = "/:id/profile/edit";
const USERCHANGEPASSWORD = "/change-password";
const ME = "/me";

const GITHUB = "/auth/github";
const GITHUBCB = "/auth/github/callback";
const NAVER = "/auth/naver";
const NAVERCB = "/auth/naver/callback";

const API = "/api";
const APILIKES = "/:id/like";
const APICOMMENTCREATE = "/:id/comment/create";
const APICOMMENTEDIT = "/:id/comment/edit";
const APICOMMENTDELETE = "/:id/comment/delete";
const APIEDITTITLe = "/:id/title";
const APIEDITDESC = "/:id/description";

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
  videoDelete: (id) => {
    if (id) {
      return `/video/${id}/delete`;
    } else {
      return VIDEODELETE;
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
  api: API,
  apiLikes: (id) => {
    if (id) {
      return `/api/${id}/like`;
    } else {
      return APILIKES;
    }
  },
  apiCommentCreate: (id) => {
    if (id) {
      return `/api/${id}/comment/create`;
    } else {
      return APICOMMENTCREATE;
    }
  },
  apiCommentEdit: (id) => {
    if (id) {
      return `/api/${id}/comment/edit`;
    } else {
      return APICOMMENTEDIT;
    }
  },
  apiCommentDelete: (id) => {
    if (id) {
      return `/api/${id}/comment/delete`;
    } else {
      return APICOMMENTDELETE;
    }
  },
  apiTitle: (id) => {
    if (id) {
      return `/api/${id}/title`;
    } else {
      return APIEDITTITLe;
    }
  },
  apiDescription: (id) => {
    if (id) {
      return `/api/${id}/description`;
    } else {
      return APIEDITDESC;
    }
  },
  naver: NAVER,
  naverCallback: NAVERCB,
  github: GITHUB,
  githubCallback: GITHUBCB,
};

export default routes;
