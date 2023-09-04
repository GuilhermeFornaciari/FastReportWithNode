const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const e = require("connect-flash");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports.User = class User {
  constructor(body) {
    this.error = [];
    this.bodyIsValid(body);
    this.username = body.username;
    this.email = body.email;
    this.password = body.password;
  }
  async login() {
    if (await this.userExists()) {
      if (!bcrypt.compareSync(this.password, this.user.password)) {
        this.error.push("Senha inválida");
        return;
      }
    } else {
      this.error.push("Usuário não existe");
      return;
    }
  }

  async register() {
    if (this.error.length > 0) {
      console.log(this.error);
      return;
    }
    if (await this.userExists()) {
      this.error.push("Usuário já está cadastrado");
      console.log(this.error);
      return;
    }

    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    try {
      this.user = await UserModel.create({
        username: this.username,
        email: this.email,
        password: this.password,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async userExists() {
    this.user = await UserModel.findOne({ email: this.email });
    if (this.user) return true;
    else return false;
  }

  async bodyIsValid(body) {
    for (let param in body) {
      if (typeof body[param] !== "string") {
        body[key] = "";
      }
      if (!body[param]) this.error.push(`O campo ${param} está vazio`);
    }

    if (!validator.isEmail(body["email"])) this.error.push("Email Inválido");
  }
};
