import passport from "passport";
import { Strategy } from "passport-local";
import mockUsers from "../mocks/mockUsers.json" assert { type: "json" };
import User from "../mongoose/schemas/user.js";
import { checkPassword } from "../utils/helpers.js";

passport.serializeUser((user, done) => {
  console.log("Inside Serialize User", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside Deserialize User");
  console.log("Decentralizing UserID", id);
  try {
    const findUser = await User.findById(id);
    if (!findUser) return done(new Error("User not found"), null);
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({username})
      if (!findUser) throw new Error("User not found");
      const isMatch = checkPassword(password, findUser.password);
      if (!isMatch) throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
