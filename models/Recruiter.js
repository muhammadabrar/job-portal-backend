const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecruiterSchema = new Schema(
  {
    userId: { type: String },
    company: { type: String },
    about: { type: String },
    email: { type: String },
    CurrentAddress: { type: String },
    city: { type: String },
    country: { type: String },
    website: { type: String },
    logo: { type: String },
    employees: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);

module.exports = Recruiter;
