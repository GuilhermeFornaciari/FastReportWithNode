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
    req.session.save(() => res.redirect("/"));
    return;
  }
  next();
};
exports.globalMiddleware = (req, res, next) => {
  res.locals.msgs = req.flash("msgs");
  res.locals.cssClass = req.flash("cssClass");
  res.locals.user = req.session.user;
  next();
};
