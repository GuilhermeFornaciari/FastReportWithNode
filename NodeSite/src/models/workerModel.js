const { Object } = require("core-js");
const mongoose = require("mongoose");
const validator = require("validator");

const WorkerSchema = new mongoose.Schema({
  Ename: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  hiringDate: { type: Date, required: true },
  role: { type: String, required: true },
  UserId: { type: String, required: true },
  presence: { type: Number, required: true },
  absence: { type: Number, required: true },
});

const WorkerModel = mongoose.model("worker", WorkerSchema);

module.exports.Worker = class Worker {
  constructor(body) {
    this.Ename = body.Ename;
    this.surname = body.surname;
    this.email = body.email;
    this.hiringDate = Date.parse(body["hiringDate"]);
    this.role = body.role;
    this.presence = 0;
    this.absence = 0;
    this.user = null;

    this.error = [];
    this.valida(body);
  }
  static async findId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return;
    return WorkerModel.findById(id);
  }
  static async findAll(id) {
    return WorkerModel.find({ UserId: id });
  }
  static async erase(WorkerId) {
    await WorkerModel.findByIdAndDelete(WorkerId);
  }

  async update(WorkerId) {
    if (this.error.length > 0) {
      return;
    }

    this.user = await WorkerModel.findByIdAndUpdate(
      WorkerId,
      {
        Ename: this.Ename,
        surname: this.surname,
        email: this.email,
        role: this.role,
        presence: this.presence,
        absence: this.absence,
      },
      { new: true }
    );
    console.log(this.user);
  }

  async register(UserId) {
    if (this.error.length > 0) {
      return;
    }

    this.user = await WorkerModel.create({
      Ename: this.Ename,
      surname: this.surname,
      email: this.email,
      hiringDate: this.hiringDate,
      role: this.role,
      presence: this.presence,
      absence: this.absence,
      UserId: UserId,
    });
  }

  async valida(body) {
    for (let param in body) {
      if (typeof body[param] !== "string") {
        body[key] = "";
      }
      if (!body[param]) this.error.push(`O campo ${param} está vazio`);
    }

    if (!validator.isEmail(this.email)) this.error.push("Email Inválido");
  }
};
