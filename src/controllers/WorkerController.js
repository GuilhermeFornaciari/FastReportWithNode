const { Worker, WorkerModel } = require("../models/workerModel");
const { errorMsg, sucessMsg } = require("../services/msgs");
const https = require("https");

exports.index = async (req, res) => {
  let worker = await Worker.findAll(res.locals.user["_id"]);
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
  let worker = await Worker.findId(req.params.id);
  res.render("WorkerEdit", { worker });
};

exports.editPost = async (req, res) => {
  const worker = new Worker(req.body);
  if (worker.error.length > 0) {
    errorMsg(req, worker.error);
    return res.redirect(`/Workers`);
  }
  await worker.update(req.params.id);
  if (worker.error.length > 0) {
    errorMsg(req, worker.error);
    return res.redirect(`/Workers`);
  }
  sucessMsg(req, "Funcionário atualizado com sucesso");
  res.redirect(`/Workers/Edit/${req.params.id}`);
};

exports.erase = async (req, res) => {
  Worker.erase(req.params.id);
  sucessMsg(req, "Funcionário apagado com sucesso");
  res.redirect(`/Workers`);
};

exports.report = async (req, res) => {
  let workers = await Worker.findAll(res.locals.user["_id"]);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log("ERRO DE SEGURANÇA NO SISTEMA DE REPORT");
  try {
    const response = await fetch("https://localhost:7119/api/Worker", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workers),
    });
    let json = await response.json();
    return res.send(json);
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
