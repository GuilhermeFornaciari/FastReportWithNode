const { Worker, WorkerModel } = require("../models/workerModel");

exports.index = (req, res) => {
  res.render("Worker");
};

exports.register = (req, res) => {
  res.render("WorkerRegister");
};

exports.registerPost = (req, res) => {
  const newWorker = new Worker(req.body);
  newWorker.register(res.locals.user["_id"]);
  if (newWorker.error.length > 0) {
    req.flash("msgs", newWorker.error);
    req.flash("cssClass", "error");
  } else {
    req.flash("msgs", "Funcionário cadastrado com sucesso");
    req.flash("cssClass", "sucess");
  }
  res.redirect("/Workers/Register");
};

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render("404");
  console.log(req.params.id);
  let worker = Worker.findId(req.params.id);
  console.log(worker);
  if (!worker) return res.render("404");

  res.render("EditWorker", { worker });
};

exports.editPost = async (req, res) => {
  if (!req.params.id) return res.render("404");
  console.log(req.params.id);
  let worker = Worker.findId(req.params.id);
  console.log(worker);
  if (!worker) return res.render("404");

  res.render("EditWorker", { worker });
};
