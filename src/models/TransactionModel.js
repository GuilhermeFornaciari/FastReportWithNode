const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  fone: { type: String, required: true },
});

const contactModel = mongoose.model("contact", contactSchema);

module.exports.NewContact = class NewContact {
  constructor(name, lastname, email, fone, user) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.fone = fone;

    this.user = user;
  }
};

module.exports.contactModel = contactModel;
