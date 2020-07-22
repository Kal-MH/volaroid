import { keywords } from "./searchKeywords";

const body = document.querySelector("body");
//searchModalWindow
const searchWindow = document.querySelector(".search-container");
const searchForm = searchWindow.querySelector("form");
const input = searchForm.querySelector("input");

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const isInputFocused = () => input === document.activeElement;

const updatePlaceHolder = async () => {
  if (!isInputFocused()) {
    if (input.placeholder == "") {
      const now = new Date();
      const term = keywords[now.getSeconds() % keywords.length];
      for (let i = 0; i < term.length; i++) {
        if (isInputFocused()) break;
        input.placeholder += term[i];
        await sleep(100);
      }
    } else {
      const term = input.placeholder;
      for (let i = 0; i < term.length; i++) {
        if (isInputFocused()) break;
        input.placeholder = term.slice(0, term.length - (i + 1));
        await sleep(50);
      }
    }
  }
  setTimeout(updatePlaceHolder, 1000);
};

const init = () => {
  input.addEventListener("focus", () => {
    input.placeholder = "";
  });
  setTimeout(updatePlaceHolder, 1000);
};
if (searchWindow) {
  init();
}
