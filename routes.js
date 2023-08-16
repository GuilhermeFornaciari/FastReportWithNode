const express = require("express");

const routes = express.Router();

//requires
const { loginRequired } = require("./src/middlewares/middlewares");

const transacController = require("./src/controllers/TransactionController");
const workerController = require("./src/controllers/WorkerController");
const accountController = require("./src/controllers/AccountController");

//controllers
routes.get("/Account", loginRequired, accountController.AccountIndex);
routes.post("/Account", loginRequired, accountController.AccountLogOut);

routes.get("/Account/Login", accountController.Login);
routes.post("/Account/Login", accountController.LoginPost);

routes.get("/Account/Login", accountController.Register);
routes.post("/Account/Login", accountController.RegisterPost);

module.exports = routes;
