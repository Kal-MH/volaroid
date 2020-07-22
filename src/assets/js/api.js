import axios from "axios";

const HIDDEN = "hidden";
const LIKECLICK = "likeClick";

const likes = document.querySelectorAll(".like");

const commentsList = document.querySelector(".video-comments");

let commentsForm;
let commentInputBtn;

let commentOnset = 0;
let commentEditForms;
let commentText;
let commentEditTextBox;
let commentEditInputBtns = [];

let videoId = window.location.href.split("/video/")[1];

//api Comment Delete
const deleteCommentBox = (form) => {
  const parentLi = form.parentNode;
  parentLi.classList.add(HIDDEN);
};
const deleteBtn = async (commentText, form) => {
  const curComment = commentText.innerText;
  await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      curComment,
    },
  }).then((res) => {
    if (res.status === 200) {
      deleteCommentBox(form);
    }
  });
};

//api CommentEdit
const setCommentEdit = (comment) => {
  commentText.innerText = comment;
};
const sendApiComment = async (comment, curComment) => {
  if (comment != "") {
    await axios({
      url: `/api/${videoId}/comment/edit`,
      method: "POST",
      data: {
        comment,
        curComment,
      },
    }).then((res) => {
      if (res.status === 200) {
        setCommentEdit(comment);
      }
    });
  }
};
const editBtn = () => {
  if (commentOnset) {
    commentEditTextBox.classList.add(HIDDEN);
    commentText.classList.remove(HIDDEN);
    commentOnset = 0;
    const curComment = commentText.innerText;
    const comment = commentEditTextBox.value;
    sendApiComment(comment, curComment);
  } else {
    commentEditTextBox.value = commentText.innerText;
    commentEditTextBox.classList.remove(HIDDEN);
    commentText.classList.add(HIDDEN);
    commentOnset = 1;
  }
};

const handleCommentEditBtn = (e) => {
  e.preventDefault();
  const form = e.target.parentNode.parentNode;
  commentText = form.childNodes[0].childNodes[0];
  commentEditTextBox = form.childNodes[1];
  if (e.target.innerText == "Edit") {
    editBtn(commentText, commentEditTextBox);
  } else if (e.target.innerText == "Delete") {
    deleteBtn(commentText, form);
  }
};
//api CommentCreate
const sendComment = async (text, imgUrl, creator) => {
  await axios({
    url: `/api/${videoId}/comment/create`,
    method: "POST",
    data: {
      text,
    },
  }).then((res) => {
    if (res.status === 200) {
      setComment(text, imgUrl, creator);
    }
  });
};

const setComment = (text, imgUrl, creatorName) => {
  const liBox = commentsList.querySelector(".comments__li-box");

  const li = document.createElement("li");

  const commentCreator = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  const commentEditForm = document.createElement("form");
  const commenttext = document.createElement("div");
  const p = document.createElement("p");
  const textarea = document.createElement("textarea");
  const btnBox = document.createElement("div");
  const buttonEdit = document.createElement("button");
  const buttonDelete = document.createElement("button");

  commentCreator.className = "comment__creator";
  img.src = imgUrl;
  span.innerText = creatorName;
  commentCreator.appendChild(img);
  commentCreator.appendChild(span);

  commentEditForm.className = "comment__text";
  commenttext.className = "form__text";
  btnBox.className = "comment__btn-box";
  p.innerText = text;
  textarea.className = "hidden";
  buttonEdit.innerText = "Edit";
  buttonDelete.innerText = "Delete";
  buttonEdit.addEventListener("click", handleCommentEditBtn);
  buttonDelete.addEventListener("click", handleCommentEditBtn);

  commenttext.appendChild(p);
  btnBox.appendChild(buttonEdit);
  btnBox.appendChild(buttonDelete);
  commentEditForm.appendChild(commenttext);
  commentEditForm.appendChild(textarea);
  commentEditForm.appendChild(btnBox);

  li.appendChild(commentCreator);
  li.appendChild(commentEditForm);

  liBox.prepend(li);
};

const handleCommentBtn = (e) => {
  const textarea = commentsForm.querySelector("textarea");
  const creatorDiv = e.target.parentNode.childNodes[0];

  const text = textarea.value;
  const imgUrl = creatorDiv.childNodes[0].src;
  const creatorName = creatorDiv.childNodes[1].innerText;
  sendComment(text, imgUrl, creatorName);
  textarea.value = "";
};

//api like
const setLike = (e) => {
  const parentNode = e.target.parentNode;
  const spanText = parentNode.childNodes[1];
  const value = Number(spanText.innerText);
  spanText.innerText = value + 1;
  parentNode.classList.add(LIKECLICK);
};
const removeLike = (e) => {
  const parentNode = e.target.parentNode;
  const spanText = parentNode.childNodes[1];
  const value = Number(spanText.innerText);
  spanText.innerText = value - 1;
  parentNode.classList.remove(LIKECLICK);
};
const handleLikeClick = (e) => {
  const grandGrandMa = e.target.parentNode.parentNode.parentNode.parentNode;
  const a = grandGrandMa.firstChild.firstChild;

  if (!videoId) {
    videoId = a.href.split("/video/")[1];
  }
  fetch(`/api/${videoId}/like`, {
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      setLike(e);
    } else if (response.status == 400) {
      removeLike(e);
    }
  });
};

if (likes) {
  likes.forEach((like) => {
    like.addEventListener("click", handleLikeClick);
  });
}
if (commentsList) {
  commentsForm = commentsList.querySelector(".comments__form");
  if (commentsForm) {
    commentInputBtn = commentsForm.querySelector("button");
    commentInputBtn.addEventListener("click", handleCommentBtn);
  }

  commentEditForms = commentsList.querySelectorAll(".comment__text");
  if (commentEditForms) {
    commentEditForms.forEach((form) => {
      const buttons = form.querySelectorAll("button");
      if (buttons.length !== 0) {
        buttons[0].addEventListener("click", handleCommentEditBtn);
        buttons[1].addEventListener("click", handleCommentEditBtn);
        commentEditInputBtns.push(buttons[0]);
      }
    });
  }
}
