exports.errorMsg = function (req, msg) {
  req.flash("msgs", msg);
  req.flash("cssClass", "error");
};

exports.sucessMsg = function (req, msg) {
  req.flash("msgs", msg);
  req.flash("cssClass", "sucess");
};
