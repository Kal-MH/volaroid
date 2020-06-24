import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    email: {
      $type: String,
      required: true,
    },
    name: {
      $type: String,
      required: true,
    },
    profile: String,
    videos: [
      {
        $type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    githubId: Number,
    naverId: Number,
    password: String,
  },
  { typeKey: "$type" }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
const model = mongoose.model("User", UserSchema);
export default model;
