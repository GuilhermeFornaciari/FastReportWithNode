const { Object } = require("core-js");
const mongoose = require("mongoose");
const validator = require("validator");

const TransacSchema = new mongoose.Schema({
  receiver: { type: String, required: true },
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  UserId: { type: String, required: true },
});

const TransacModel = mongoose.model("Transac", TransacSchema);

module.exports.Transac = class Transac {
  constructor(body) {
    this.receiver = body.receiver;
    this.date = Date.parse(body.date);
    this.value = body.value;

    this.error = [];
    this.valida(body);
  }
  static async findId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return;
    return TransacModel.findById(id);
  }
  static async findAll(id) {
    return TransacModel.find({ UserId: id });
  }
  static async erase(WorkerId) {
    await TransacModel.findByIdAndDelete(WorkerId);
  }

  async register(UserId) {
    if (this.error.length > 0) {
      return;
    }

    this.user = await TransacModel.create({
      receiver: this.receiver,
      date: this.date,
      value: this.value,
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
    if (this.date > new Date().getTime())
      this.error.push(`A data inserida não pode ultrapassar a data atual`);
  }
};
