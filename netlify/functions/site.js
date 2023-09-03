require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("../../routes");
const mongoose = require("mongoose");
const helmet = require("helmet");
const csrf = require("csurf");
import serverless from 'serverless-http';
const {
  checkCsrfError,
  csrfMiddleware,
  globalMiddleware,
} = require("../../src/middlewares/middlewares");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

//#####################
const app = express();

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => app.emit("ready"))
  .catch((e) => console.log(e));

///
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = session({
  secret: "iuhnftdfftuffjktydftyrfjqgbecfrvigvhf",
  Store: MongoStore.create({ mongoUrl: "mongodb+srv://GFornaciari:Fornaciari1@cursos.a8qmbsr.mongodb.net/?retryWrites=true&w=majority" }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

app.set("views", [
  path.resolve(__dirname, "src", "views"),
  path.resolve(__dirname, "src", "views", "Account"),
  path.resolve(__dirname, "src", "views", "Workers"),
  path.resolve(__dirname, "src", "views", "Transac"),
]);
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);

app.use(csrf());
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use("/site/",router);

export const handler = serverless(app);

