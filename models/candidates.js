const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CandidatesSchema = new Schema(
  {
    userId: { type: String },
    Image: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    about: { type: String },
    DateOfBirth: { type: Date },
    gender: { type: String },
    nationality: { type: String },
    email: { type: String },
    phone: [
      {
        type: { type: String },
        code: { type: String },
        phoneNo: { type: String },
      },
    ],
    socailmedia: [
      {
        socailMedia: { type: String },
        Link: { type: String },
      },
    ],
    address: {
      CurrentAddress: { type: String },
      addressLine2: { type: String },
      postalCode: { type: String },
      city: { type: String },
      country: { type: String },
    },
    Education: [
      {
        degree: { type: String },
        field: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        startDate: { type: Date },
        endDate: { type: Date },
        Underprogress: { type: Boolean },
        organization: { type: String },
      },
    ],
    Experince: [
      {
        role: { type: String },
        company: { type: String },
        startingDate: { type: Date },
        endDate: { type: Date },
        Underprogress: { type: Boolean },
        Detail: { type: String },
      },
    ],
    Skills: [],
    digitalSkills: [],
    comunicationSkill: { type: String },
    languages: [],
    hobbies: [],
  },
  {
    timestamps: true,
  }
);

const Candidates = mongoose.model("Candidates", CandidatesSchema);

module.exports = Candidates;
