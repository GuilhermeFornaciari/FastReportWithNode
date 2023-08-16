const { User } = require("../models/workerModel");

exports.transac = (req, res) => {
  res.render("registerT");
};

exports.transacSubmit = (req, res) => {
  res.send(req.body);
};
