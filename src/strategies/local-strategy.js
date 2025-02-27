import passport from "passport";
import { Strategy } from "passport-local";
import mockUsers from "../mocks/mockUsers.json" assert { type: "json" };

passport.serializeUser((user, done) => {
  console.log("Inside Serialize User", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Inside Deserialize User");
  console.log("Decentralizing UserID", id);
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) return done(new Error("User not found"), null);
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log("username:", username);
    console.log("password:", password);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) throw Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
