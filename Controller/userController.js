import { user } from "../db";

export const userProfile = (req, res) => {
  res.render("userProfile", { title: "Profile", user });
};
