const { User } = require("../models/workerModel");

exports.index = (req, res) => {
  res.render("Transac");
};

exports.register = (req, res) => {
  res.render("TransacRegister");
};

exports.registerPost = (req, res) => {
  res.send(req.body);
};
