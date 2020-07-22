import axios from "axios";

const titleBox = document.querySelector(".title__box");
const titleEditBtn = document.querySelector(".title-editBtn");
let titleA;
let titleh1;
let titleInput;

const descriptionBox = document.querySelector(".description__box");
const descriptionBtn = document.querySelector(".description-editBtn");
let descriptionP;
let descriptionArea;

const videoDeleteBox = document.querySelector(".delete-box");
let videoDeleteText;
let videoDeleteLink;
let videoDeleteNo;

const HIDDEN = "hidden";
const SLIDINGDELETE = "slidingDelete";
const videoId = window.location.href.split("/video/")[1];

let titleOnset = 0; //if current value is '0', it isn't 'edit' mode;
let descriptionOnset = 0;

//delete Video
const handleDeleteNoClick = () => {
  videoDeleteText.innerText = "Delete Video";
  videoDeleteLink.classList.add(HIDDEN);
  videoDeleteNo.classList.add(HIDDEN);
};
const handleDeleteClick = () => {
  videoDeleteText.innerText = "Are you sure?";
  videoDeleteLink.classList.remove(HIDDEN);
  videoDeleteNo.classList.remove(HIDDEN);
};

//edit Title
const sendApiTitle = async () => {
  const title = titleInput.value;
  if (title != "") {
    await axios({
      url: `/api/${videoId}/title`,
      method: "POST",
      data: {
        title,
      },
    }).then((res) => {
      if (res.status === 200) {
        getTitle(title);
      }
    });
  }
};

const getTitle = (title) => {
  titleh1.innerText = title;
};

const handleTitleEditClick = () => {
  if (!titleOnset) {
    titleInput.value = titleh1.innerText;
    titleInput.classList.remove(HIDDEN);
    titleA.classList.add(HIDDEN);
    titleOnset = 1;
  } else {
    sendApiTitle();
    titleInput.classList.add(HIDDEN);
    titleA.classList.remove(HIDDEN);
    titleOnset = 0;
  }
};

//edit Description
const getDescription = (description) => {
  descriptionP.innerText = description;
};
const sendApiDescription = async () => {
  const description = descriptionArea.value;
  if (description != "") {
    await axios({
      url: `/api/${videoId}/description`,
      method: "POST",
      data: {
        description,
      },
    }).then((res) => {
      if (res.status === 200) {
        getDescription(description);
      }
    });
  }
};
const handleDesEditClick = () => {
  if (!descriptionOnset) {
    descriptionArea.value = descriptionP.innerText;
    descriptionArea.classList.remove(HIDDEN);
    descriptionP.classList.add(HIDDEN);
    descriptionOnset = 1;
  } else {
    sendApiDescription();
    descriptionArea.classList.add(HIDDEN);
    descriptionP.classList.remove(HIDDEN);
    descriptionOnset = 0;
  }
};
const init = () => {
  titleA = titleBox.querySelector("a");
  titleh1 = titleA.querySelector("h1");
  titleInput = titleBox.querySelector("input");

  descriptionP = descriptionBox.querySelector("p");
  descriptionArea = descriptionBox.querySelector("textarea");

  titleEditBtn.addEventListener("click", handleTitleEditClick);
  descriptionBtn.addEventListener("click", handleDesEditClick);
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      event.preventDefault();
    }
  });

  videoDeleteText = videoDeleteBox.querySelector(".delete-box__text");
  videoDeleteLink = videoDeleteBox.querySelector("a");
  videoDeleteNo = videoDeleteBox.querySelectorAll("span")[1];

  videoDeleteText.addEventListener("click", handleDeleteClick);
  videoDeleteNo.addEventListener("click", handleDeleteNoClick);
};
if (titleBox && titleEditBtn && descriptionBox && descriptionBtn) {
  init();
}
