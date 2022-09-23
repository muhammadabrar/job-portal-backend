const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ApplicationsSchema = new Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "required"],
    },
    posted_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "required"],
    },
    applied_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "required"],
    },
    status: {
      type: Number,
      default: 1, // 2 - Shortlist, 3 - Rejected
      required: [true, "required"],
    },
  },
  {
    timestamps: true,
  }
);

const Applications = mongoose.model("Applications", ApplicationsSchema);

module.exports = Applications;
