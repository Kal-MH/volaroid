const titleBox = document.querySelector(".title__box");
const titleEditBtn = document.querySelector(".title-editBtn");
let titleA;
let titleh1;
let titleInput;

const descriptionBox = document.querySelector(".description__box");
const descriptionBtn = document.querySelector(".description-editBtn");
let descriptionP;
let descriptionArea;

const HIDDEN = "hidden";

let titleOnset = 0; //if current value is '0', it isn't 'edit' mode;
let descriptionOnset = 0;

const getTitle = () => {
  const title = titleInput.value;
  if (title != "") {
    titleh1.innerText = title;
  }
};

const handleEditClick = () => {
  if (!titleOnset) {
    titleInput.value = titleh1.innerText;
    titleInput.classList.remove(HIDDEN);
    titleA.classList.add(HIDDEN);
    titleOnset = 1;
  } else {
    getTitle();
    titleInput.classList.add(HIDDEN);
    titleA.classList.remove(HIDDEN);
    titleOnset = 0;
  }
};
const getDescription = () => {
  const description = descriptionArea.value;
  if (description != "") {
    descriptionP.innerText = description;
  }
};
const handleDesEditClick = () => {
  if (!descriptionOnset) {
    descriptionArea.value = descriptionP.innerText;
    descriptionArea.classList.remove(HIDDEN);
    descriptionP.classList.add(HIDDEN);
    descriptionOnset = 1;
  } else {
    getDescription();
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

  titleEditBtn.addEventListener("click", handleEditClick);
  descriptionBtn.addEventListener("click", handleDesEditClick);
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      event.preventDefault();
    }
  });
};
if (titleBox && titleEditBtn && descriptionBox && descriptionBtn) {
  init();
}
