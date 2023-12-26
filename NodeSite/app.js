require("dotenv").config();
const {loginRequired,  workerIdRequired,  transacIdRequired} = require("./src/middlewares/middlewares");
const transacController = require("./src/controllers/TransacController");
const workerController = require("./src/controllers/WorkerController");
const accountController = require("./src/controllers/AccountController");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  checkCsrfError,
  csrfMiddleware,
  globalMiddleware,
} = require("./src/middlewares/middlewares");
const session = require("cookie-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

class app {

  constructor(){
    this.app = express();
    mongoose.connect(process.env.CONNECTIONSTRING)
  
    ///
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    
    this.app.use(express.static(path.join(__dirname, "public")));
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
    this.app.use(sessionOptions);
    this.app.use(flash());
    
    this.app.set("view engine", "ejs");
    this.app.engine('ejs', require('ejs').__express);
    
    this.app.set("views", [
      path.resolve(__dirname , "src", "views"),
      path.resolve(__dirname , "src", "views", "Account"),
      path.resolve(__dirname , "src", "views", "Workers"),
      path.resolve(__dirname , "src", "views", "Transac"),
    ]);
    this.app.use(csrf());
    this.app.use(globalMiddleware);
    this.app.use(checkCsrfError);
    this.app.use(csrfMiddleware);
    this.app.use(this.router());
  }
  router(){
    const router = express.Router()
    router.get("/", accountController.login);
    router.get("/Account", loginRequired, accountController.index);
    router.post("/Account", loginRequired, accountController.logOut);
    router.get("/Account/Login", accountController.login);
    router.post("/Account/Login", accountController.loginPost);
    router.get("/Account/Register", accountController.register);
    router.post("/Account/Register", accountController.registerPost);

    router.post("/Workers/Register", loginRequired, workerController.registerPost);
    router.get("/Workers/Register", loginRequired, workerController.register);
    router.get("/Workers/Report", loginRequired, workerController.report);
    router.get("/Workers", loginRequired, workerController.index);
    router.get("/Workers/Edit/:id",loginRequired,workerIdRequired,workerController.edit);
    router.get("/Workers/Erase/:id",  loginRequired,  workerIdRequired,  workerController.erase);
    router.post("/Workers/Edit/:id",  loginRequired,  workerIdRequired,  workerController.editPost);

    router.get("/Transac", loginRequired, transacController.index);
    router.get("/Transac/Register", loginRequired, transacController.register);
    router.post("/Transac/Register", loginRequired, transacController.registerPost);
    router.get("/Transac/Erase/:id", loginRequired, transacIdRequired, transacController.erase);
    router.get("/Transac/Report", loginRequired, transacController.report);
    return router
  }

}
//#####################


module.exports = new app()