export const videoDetail = (req, res) => {
  res.render("videoDetail", { title: "Video Detail" });
};
export const getUpload = (req, res) => {
  res.render("videoUpload", { title: "Upload" });
};
