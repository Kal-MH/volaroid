const videoInDetail = document.querySelector(".jsVideo");
const videoInProfile = document.querySelector(".jsDetailVideo");
const handleVideoEneded = (e) => {
  e.target.currentTime = 0;
};

const init = () => {
  if (videoInDetail) {
    videoInDetail.addEventListener("ended", handleVideoEneded);
  }
  if (videoInProfile) {
    videoInProfile.addEventListener("ended", handleVideoEneded);
  }
};

init();
