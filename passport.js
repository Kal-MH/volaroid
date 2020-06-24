import passport from "passport";
import passportLocal from "passport-local";
import User from "./Models/User";

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
      console.log("Password is match");
      return done(null, user);
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
