import passport from "passport";
import passportLocal from "passport-local";
import User from "./Models/User";
import githubStrategy from "passport-github";
import naverStrategy from "passport-naver";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

//naver authentication
passport.use(
  new naverStrategy(
    {
      clientID: process.env.NAVERID,
      clientSecret: process.env.NAVERSECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://sleepy-shore-92977.herokuapp.com${routes.naverCallback}`
        : `http://localhost:${process.env.PORT}${routes.naverCallback}`,
    },
    async function (_, __, profile, cb) {
      const {
        _json: { email, nickname: name, profile_image, id },
      } = profile;
      try {
        console.log(name);
        const user = await User.findOne({ email });
        if (user) {
          user.naverId = id;
          user.save();
          return cb(null, user);
        } else {
          const newUser = await User.create({
            naverId: id,
            name: name ? name : "Anonymous",
            email,
            profile: profile_image,
          });
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

//github authentication
passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUBID,
      clientSecret: process.env.GITHUBSECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://sleepy-shore-92977.herokuapp.com${routes.githubCallback}`
        : `http://localhost:${process.env.PORT}${routes.githubCallback}`,
    },
    async function (_, __, profile, cb) {
      const {
        _json: { id, avatar_url, name, email },
      } = profile;
      try {
        const user = await User.findOne({ email });
        if (user) {
          user.githubId = id;
          user.save();
          return cb(null, user);
        } else {
          const newUser = await User.create({
            githubId: id,
            name,
            email,
            profile: avatar_url,
          });
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

const LocalStrategy = passportLocal.Strategy;

const loginFunction = (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(null, false);
      console.log("Password match: " + isMatch);
      if (isMatch) {
        return done(null, user);
      } else return done(null, false);
    });
    // if (!user.validPassword(password)) {
    //   return done(null, flase, { message: "Incorrect password." });
    // }
    // return done(null, user);
  });
};
const joinFunction = (IncommingMessage, _, __, done) => {
  const {
    body: { email, name, password },
  } = IncommingMessage;
  User.findOne({ email }, async (err, user) => {
    if (err) {
      console.log(err);
      return done(err);
    }
    if (user) {
      console.log("user is already in use.");
      return done(null, false, { message: "Email is already in use." });
    }
    try {
      const newUser = await new User({
        email,
        name,
        password,
      });
      newUser.save((err, result) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        return done(null, newUser);
      });
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  });
};

passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    joinFunction
  )
);
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    loginFunction
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
