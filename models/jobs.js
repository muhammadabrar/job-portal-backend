const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobsSchema = new Schema(
  {
    title: { type: String },
    industry: { type: String },
    minimum_age: { type: String },
    maximum_age: { type: String },
    type: { type: String },
    location:{ type: String },
    priority: { type: String },
    experience: { type: String },
    starting_salary: { type: Number },
    address: { type: String },
    zip_code: { type: String },
    positions: { type: Number },
    description: { type: String },
    status: { type: Number },
    userId: { type: String }
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model("Jobs", JobsSchema);

module.exports = Jobs;
