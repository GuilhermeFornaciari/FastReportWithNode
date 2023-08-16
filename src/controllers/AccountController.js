const { User } = require("../models/UserModel");

exports.AccountIndex = (req, res) => {
  res.render("Account");
};

exports.AccountLogOut = (req, res) => {
  req.session.destroy();
  res.redirect("/Login");
};

exports.Register = (req, res) => {
  res.render("Register");
};

exports.RegisterPost = async (req, res) => {
  const newRegister = new User(req.body);
  await newRegister.register();
  console.log(newRegister.error);

  if (newRegister.error.length > 0) {
    req.flash("msgs", newRegister.error);
    req.flash("cssClass", "error");
    res.redirect("Register");
  } else {
    req.flash("msgs", "Usuário Cadastrado com sucesso");
    req.flash("cssClass", "sucess");
    res.redirect("back");
  }
};
exports.Login = (req, res) => {
  res.render("/Login");
};
exports.LoginPost = async (req, res) => {
  if (req.session.user) {
    req.flash("msgs", ["Você já está logado"]);
    req.flash("cssClass", "error");
    return res.redirect("/Login");
  }

  const newLogin = new User(req.body);
  await newLogin.login();
  if (newLogin.error.length > 0) {
    req.flash("msgs", newLogin.error);
    req.flash("cssClass", "error");
    return res.redirect("/");
  }
  req.session.user = newLogin.user;
  req.flash("msgs", "Você logou com sucesso");
  req.flash("cssClass", "sucess");
  return res.redirect("/Login");
};
