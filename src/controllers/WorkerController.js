const { Worker, WorkerModel } = require("../models/workerModel");
const { errorMsg, sucessMsg } = require("../services/msgs");

exports.index = async (req, res) => {
  if (!req.params.id) return res.render("404");
  let worker = await Worker.findAll(req.params.id);
  if (!worker) return res.render("404");
  res.render("Worker", { worker });
};

exports.register = (req, res) => {
  res.render("WorkerRegister");
};

exports.registerPost = (req, res) => {
  const newWorker = new Worker(req.body);
  newWorker.register(res.locals.user["_id"]);
  if (newWorker.error.length > 0) {
    errorMsg(req, newWorker.error);
    res.redirect("/Workers/Register");
  } else {
    sucessMsg(req, "Funcionário cadastrado com sucesso");
    res.redirect(`/Workers/Register`);
  }
};

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render("404");
  let worker = await Worker.findId(req.params.id);
  if (!worker) return res.render("404");
  res.render("WorkerEdit", { worker });
};

exports.editPost = async (req, res) => {
  if (!req.params.id) return res.render("404");
  let person = await Worker.findId(req.params.id);
  if (!person) return res.render("404");

  const worker = new Worker(req.body);
  if (worker.error.length > 0) {
    errorMsg(req, worker.error);
    return res.redirect(`/Workers/${req.params.id}`);
  }
  await worker.update(req.params.id);
  if (worker.error.length > 0) {
    errorMsg(req, worker.error);
    return res.redirect(`/Workers/${req.params.id}`);
  }
  sucessMsg(req, "Funcionário atualizado com sucesso");
  res.redirect(`/Workers/Edit/${req.params.id}`);
};

exports.erase = async (req, res) => {
  if (!req.params.id) return res.render("404");
  let person = await Worker.findId(req.params.id);
  if (!person) return res.render("404");
  Worker.erase(req.params.id);
  sucessMsg(req, "Funcionário apagado com sucesso");
  res.redirect(`/Workers/${res.locals.user["_id"]}`);
};
