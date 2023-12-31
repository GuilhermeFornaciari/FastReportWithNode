const path = require("path");
const { User } = require("../models/UserModel");
const  fs = require("fs")

exports.index = (req, res) => {
  res.render("Account");
};

exports.logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/Account/Login");
};

exports.register = (req, res) => {
  res.render("Register");
};

exports.registerPost = async (req, res) => {
  const newRegister = new User(req.body);
  await newRegister.register();
  console.log(newRegister.error);

  if (newRegister.error.length > 0) {
    req.flash("msgs", newRegister.error);
    req.flash("cssClass", "error");
    res.redirect("/Account/Register");
  } else {
    req.flash("msgs", "Usuário Cadastrado com sucesso");
    req.flash("cssClass", "sucess");
    res.redirect("/Account/Login");
  }
};
exports.login = (req, res) => {
  res.render("Login.ejs");
};
exports.loginPost = async (req, res) => {
  if (req.session.user) {     
    req.flash("msgs", ["Você já está logado"]);
    req.flash("cssClass", "error");
    return res.redirect("/Account/Login");
  }

  const newLogin = new User(req.body);
  await newLogin.login();
  if (newLogin.error.length > 0) {
    req.flash("msgs", newLogin.error);
    req.flash("cssClass", "error");
    return res.redirect("/Account/Login");
  }
  req.session.user = newLogin.user;
  req.flash("msgs", "Você logou com sucesso");
  req.flash("cssClass", "sucess");
  return res.redirect("/Account/Login");
};

