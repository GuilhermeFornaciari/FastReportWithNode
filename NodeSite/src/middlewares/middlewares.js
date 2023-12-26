const { Worker } = require("../models/workerModel");
const { Transac } = require("../models/transacModel");

exports.checkCsrfError = (err, req, res, next) => {
  if (err && "EBADCSRFTOKEN" === err.code) {
    return res.send("BAD CSRF");
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash("msgs", "Você deve estar logado para acessar esta pagina");
    req.flash("cssClass", "error");
    req.session.save(() => res.redirect("/Account/Login"));
    return;
  }
  next();
};
exports.workerIdRequired = async (req, res, next) => {
  if (!req.params.id) return res.render("404");
  let person = await Worker.findId(req.params.id);
  if (!person) return res.render("404");
  if (person.UserId != req.session.user["_id"]) return res.render("404");
  next();
};
exports.transacIdRequired = async (req, res, next) => {
  if (!req.params.id) return res.render("404");
  let person = await Transac.findId(req.params.id);
  if (!person) return res.render("404");
  if (person.UserId != req.session.user["_id"]) return res.render("404");
  next();
};


exports.globalMiddleware = (req, res, next) => {
  res.locals.msgs = req.flash("msgs");
  res.locals.cssClass = req.flash("cssClass");
  res.locals.user = req.session.user;
  next();
};
