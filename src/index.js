import express from "express";
import { config } from "dotenv";
import routes from "./routes/index.js";
import { loggingMiddleware } from "./utils/middlewares.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import mockUsers from "./mocks/mockUsers.json" assert { type: "json" };
import { responseError, responseSuccess } from "./utils/response.js";
import { validate } from "./utils/middlewares.js";
import { loginValidationSchema } from "./utils/validationSchemas.js";
import passport from "passport";
import mongoose from "mongoose";
import "./strategies/local-strategy.js";


config();
const PORT = process.env.PORT || 8000;

const app = express();
mongoose.connect("mongodb://localhost/express_tutorial")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cookieParser("secret"));
app.use(loggingMiddleware);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post("/api/auth", passport.authenticate('local'), (req, res) => {
  return responseSuccess(res, req.user, "User Logged In");
});

app.get("/api/auth/status", (req, res) => {
  console.log("User", req.user);
  console.log("Session", req.session);
  if (req.user) return responseSuccess(res, req.user, "User Status");
  return responseError(res, "Unauthorized", 401);
  
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return responseError(res, "Unauthorized", 401);
  req.logout((err) => {
    if (err) return responseError(res, err, 500);
    return responseSuccess(res, null, "User Logged Out");
  });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
