const { Transac } = require("../models/transacModel");
const { errorMsg, sucessMsg } = require("../services/msgs");

exports.index = async (req, res) => {
  let transac = await Transac.findAll(res.locals.user["_id"]);
  res.render("Transac", { transac });
};

exports.register = (req, res) => {
  res.render("TransacRegister");
};

exports.registerPost = (req, res) => {
  const newTransac = new Transac(req.body);
  newTransac.register(res.locals.user["_id"]);
  if (newTransac.error.length > 0) {
    errorMsg(req, newTransac.error);
    res.redirect("/Transac/Register");
  } else {
    sucessMsg(req, "Funcionário cadastrado com sucesso");
    res.redirect(`/Transac/Register`);
  }
};

exports.edit = async (req, res) => {
  let transac = await Transac.findId(req.params.id);
  res.render("TransacEdit", { transac });
};

exports.editPost = async (req, res) => {
  const transac = new Transac(req.body);
  if (transac.error.length > 0) {
    errorMsg(req, transac.error);
    return res.redirect(`/Transac`);
  }
  await transac.update(req.params.id);
  if (transac.error.length > 0) {
    errorMsg(req, transac.error);
    return res.redirect(`/Transac`);
  }
  sucessMsg(req, "Funcionário atualizado com sucesso");
  res.redirect(`/Transac/Edit/${req.params.id}`);
};

exports.erase = async (req, res) => {
  Transac.erase(req.params.id);
  sucessMsg(req, "Transação apagada com sucesso");
  res.redirect(`/Transac`);
};
