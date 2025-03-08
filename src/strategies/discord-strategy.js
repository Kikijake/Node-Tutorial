import passport from "passport";
import Strategy from "passport-discord";
import DiscordUser from "../mongoose/schemas/discord-user.js";

passport.serializeUser((user, done) => {
  console.log("Inside Serialize User::", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside Deserialize User");
  console.log("Decentralizing UserID::", id);
  try {
    const findUser = await DiscordUser.findById(id);
    if (!findUser) return done(null, null);
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: "1347901154243117089",
      clientSecret: "m3moTL7GD5AIh372zUMAGDyUWWJhs2lM",
      callbackURL: "http://localhost:8000/api/auth/discord/redirect",
      scope: ["identify"]
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      try {
        findUser = await DiscordUser.findOne({ discordId: profile.id })
      } catch (error) {
       return done(error, null);
      }

      try {
        if (!findUser) {
          const newDiscordUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });
          const newSavedUser = await newDiscordUser.save();
          return done(null, newSavedUser);
        }
        return done(null, findUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);