const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    access_token: { type: String },
    refresh_token: { type: String },
    user_type: { type: Number },
    code: { type: Number },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
