const express = require("express");

const routes = express.Router();

//requires
const { loginRequired } = require("./src/middlewares/middlewares");

const transacController = require("./src/controllers/TransactionController");
const workerController = require("./src/controllers/WorkerController");
const accountController = require("./src/controllers/AccountController");

//controllers
routes.get("/Account", loginRequired, accountController.index);
routes.post("/Account", loginRequired, accountController.logOut);
routes.get("/Account/Login", accountController.login);
routes.post("/Account/Login", accountController.loginPost);
routes.get("/Account/Register", accountController.register);
routes.post("/Account/Register", accountController.registerPost);

routes.get("/Workers/Register", loginRequired, workerController.register);
routes.post("/Workers/Register", loginRequired, workerController.registerPost);
routes.get("/Workers/:id", loginRequired, workerController.index);
routes.get("/Workers/Edit/:id", loginRequired, workerController.edit);
routes.post("/Workers/Edit/:id", loginRequired, workerController.editPost);
routes.get("/Workers/Erase/:id", loginRequired, workerController.erase);

routes.get("/Transac", loginRequired, transacController.index);
routes.get("/Transac/Register", loginRequired, transacController.register);
routes.post("/Transac/Register", loginRequired, transacController.registerPost);

module.exports = routes;
