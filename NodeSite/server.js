require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const mongoose = require("mongoose");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  checkCsrfError,
  csrfMiddleware,
  globalMiddleware,
} = require("./src/middlewares/middlewares");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

//#####################
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
  Store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);

app.set("views", [
  path.resolve(__dirname , "src", "views"),
  path.resolve(__dirname , "src", "views", "Account"),
  path.resolve(__dirname , "src", "views", "Workers"),
  path.resolve(__dirname , "src", "views", "Transac"),
]);

app.use(csrf());
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.on("ready", () => {
  app.listen(3000, () => console.log("Acesse: http://localhost:3000"));
});
