const changePasswordForm = document.querySelector(".changePassword-form");
let changePasswordH3;
let changePasswordInputBox;

const HIDDEN = "hidden";

let h3Onset = 0;
const handleH3click = () => {
  if (h3Onset) {
    changePasswordInputBox.classList.add(HIDDEN);
    h3Onset = 0;
  } else {
    changePasswordInputBox.classList.remove(HIDDEN);
    h3Onset = 1;
  }
};
const init = () => {
  changePasswordH3.addEventListener("click", handleH3click);
};
if (changePasswordForm && changePasswordH3) {
  changePasswordH3 = changePasswordForm.querySelector(".changePassword-title");
  changePasswordInputBox = changePasswordForm.querySelector(
    ".changePassword__input-box"
  );
  init();
}
