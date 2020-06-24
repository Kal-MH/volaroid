const body = document.querySelector("body");
//searchModalWindow
const searchWindow = document.querySelector(".search-container");
const searchDiv = searchWindow.querySelector(".search");
const searchH1 = searchWindow.querySelector("h1");
const searchInput = searchWindow.querySelector("input");
//side-bar
const sideBar = document.querySelector(".bar-container");
const functions = sideBar.querySelectorAll("span");
const menuIcon = functions[0].querySelector("i");
const searchIcon = functions[1].querySelector("i");

//window UPIcon
const upIcon = document.querySelector(".window-up");

const SHOW = "show";
const HIDDEN = "hidden";
const SLIDINGLOGGED = "slidingLogged";
const SLIDINGUNLOGGED = "slidingUnlogged";
const SLIDINGSEARCH = "slidingSearch";
const LOGGEDBAR = "logged-bar";
const UNLOGGEDBAR = "unlogged-bar";

let menuClickOnset = 0;
let searchClickOnset = 0;

if (functions.length == 5) {
  sideBar.classList.add(LOGGEDBAR);
} else {
  sideBar.classList.add(UNLOGGEDBAR);
}

//When you click loginspan in the header or login in the sidebar shows.
const handleSearchClick = () => {
  if (searchClickOnset) {
    searchWindow.classList.remove(SLIDINGSEARCH);
    searchClickOnset = 0;
  } else {
    searchWindow.classList.add(SLIDINGSEARCH);
    searchClickOnset = 1;
  }
};
const handleBody = (e) => {
  if (
    e.target != searchIcon &&
    e.target != searchWindow &&
    e.target != searchDiv &&
    e.target != searchH1 &&
    e.target != searchInput
  ) {
    if (searchClickOnset) handleSearchClick();
  }
};

const handleUpClick = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

//When you click the menu icon, sideBar shows.
const handleMenuClickSliding = () => {
  if (menuClickOnset) {
    if (functions.length == 5) {
      sideBar.classList.remove(SLIDINGLOGGED);
    } else {
      sideBar.classList.remove(SLIDINGUNLOGGED);
    }
    menuClickOnset = 0;
  } else {
    if (functions.length == 5) {
      sideBar.classList.add(SLIDINGLOGGED);
    } else {
      sideBar.classList.add(SLIDINGUNLOGGED);
    }
    menuClickOnset = 1;
  }
};

//When you scroll down, sideBar shows.
const scrollHeader = () => {
  if (scrollY == 0) {
    sideBar.classList.add(HIDDEN);
  } else {
    sideBar.classList.remove(HIDDEN);
  }
};
const init = () => {
  //window.onscroll = scrollHeader;
  menuIcon.addEventListener("click", handleMenuClickSliding);
  upIcon.addEventListener("click", handleUpClick);
  searchIcon.addEventListener("click", handleSearchClick);
  body.addEventListener("click", handleBody);
};

if (sideBar) {
  init();
}
