const express = require("express");

const routes = express.Router();

//requires
const {
  loginRequired,
  workerIdRequired,
  transacIdRequired,
} = require("./src/middlewares/middlewares");

const transacController = require("./src/controllers/TransacController");
const workerController = require("./src/controllers/WorkerController");
const accountController = require("./src/controllers/AccountController");



routes.get("/", loginRequired,  accountController.login);

//controllers
routes.get("/Account", loginRequired, accountController.index);
routes.post("/Account", loginRequired, accountController.logOut);
routes.get("/Account/Login", accountController.login);
routes.post("/Account/Login", accountController.loginPost);
routes.get("/Account/Register", accountController.register);
routes.post("/Account/Register", accountController.registerPost);

routes.post("/Workers/Register", loginRequired, workerController.registerPost);
routes.get("/Workers/Register", loginRequired, workerController.register);
routes.get("/Workers/Report", loginRequired, workerController.report);
routes.get("/Workers", loginRequired, workerController.index);
routes.get("/Workers/Edit/:id",loginRequired,workerIdRequired,workerController.edit);
routes.get("/Workers/Erase/:id",  loginRequired,  workerIdRequired,  workerController.erase);
routes.post("/Workers/Edit/:id",  loginRequired,  workerIdRequired,  workerController.editPost);

routes.get("/Transac", loginRequired, transacController.index);
routes.get("/Transac/Register", loginRequired, transacController.register);
routes.post("/Transac/Register", loginRequired, transacController.registerPost);
routes.get("/Transac/Erase/:id", loginRequired, transacIdRequired, transacController.erase);
routes.get("/Transac/Report", loginRequired, transacController.report);


module.exports = routes;
